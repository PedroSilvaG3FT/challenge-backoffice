import { Component, OnInit } from "@angular/core";
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

  public displayedColumns: string[] = [
    "id",
    "name",
    "startingWeight",
    "action",
  ];
  public dataSource: any[] = [];

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
        this.dataSource = response.filter((user) => !user.payday);
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
