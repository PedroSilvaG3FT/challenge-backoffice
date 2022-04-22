import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { USER_TYPE } from "../../constants/userType.constant";
import { MemberInterface } from "../../interfaces/member.interface";
import { PaymentUserService } from "../../services/payment-user.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-member-approval",
  templateUrl: "./member-approval.component.html",
})
export class MemberApprovalComponent implements OnInit {
  public title: string = "Aprovação de Membros";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[] = [
    "id",
    "name",
    "startingWeight",
    "data",
    "action",
  ];
  public dataSource: any[] = [];
  public dataSourceNew = new MatTableDataSource();

  constructor(
    private userService: UserService,
    private paymentUserService: PaymentUserService
  ) {}

  ngOnInit(): void {
    this.setDataSource();
  }

  setDataSource() {
    const params = {
      active: false,
      userType: USER_TYPE.challenge,
    };

    this.userService.getAll(params).subscribe(
      (response) => {
        const filtered = response.filter((user) => !user.payday);
        this.dataSource = filtered;
        this.dataSourceNew.data = filtered;
        this.dataSourceNew.paginator = this.paginator;
      },
      (error) => console.log("ERROR :", error)
    );
  }

  approveMember(member: MemberInterface) {
    const currentDate = new Date();

    member.paymentId = 1;
    member.active = true;
    member.dateApproval = currentDate;
    member.payday = currentDate.getDate();

    this.userService.update(member).subscribe(
      (response) => {
        this.paymentUserService
          .create({
            userId: member.id,
            payday: member.payday,
            paymentId: member.paymentId,
          })
          .subscribe(() => this.setDataSource());
      },
      (error) => {
        console.log("ERROR :", error);
      }
    );
  }

  reproveMember(id) {
    this.userService.reprove(id).subscribe(
      (response) => {
        this.setDataSource();
      },
      (error) => {
        console.log("ERROR :", error);
      }
    );
  }
}
