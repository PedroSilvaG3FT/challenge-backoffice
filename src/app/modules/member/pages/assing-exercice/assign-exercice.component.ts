import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ExerciceUserService } from "../../services/exercice-user.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AssignExerciceMemberComponent } from "../../components/assign-exercice-member/assign-exercice-member.component";
import { ActivatedRoute } from "@angular/router";
import { LoadingService } from "@fuse/components/loading/loading.service";

@Component({
  selector: "assign-exercice",
  templateUrl: "assign-exercice.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AssignExerciceComponent implements OnInit {
  public title: string = "Atribuir Exercicios";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public userType: number;
  public isActive: boolean = true;
  public dataSourceNew = new MatTableDataSource();

  public displayedColumns: string[] = [
    "id",
    "name",
    "startingWeight",
    "currentWeight",
    "goalWeek",
    "goalWeight",
    "action",
  ];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private exerciceUserService: ExerciceUserService
  ) {}

  ngOnInit(): void {
    this.setDataSource();
  }

  get isDisabled() {
    return !this.dataSourceNew.data.some(({ selected }) => selected);
  }

  setDataSource() {
    this.activatedRoute.data.subscribe(({ userType }) => {
      this.userType = Number(userType);
      this.userService.getAll({ userType }).subscribe(
        (response) => {
          this.dataSourceNew.data = response.map((member) => ({
            ...member,
            selected: false,
          }));
          this.dataSourceNew.paginator = this.paginator;
        },
        (error) => console.log("ERROR :", error)
      );
    });
  }

  openModalAssign(isAssingToAll = false): void {
    const dialogRef = this.dialog.open(AssignExerciceMemberComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      else if (isAssingToAll) this.assignExerciceToAll(result);
      else if (result.length) this.assignExercice(result);

      console.log("RESULT :", result);
      // this.assignExercice(result);
    });
  }

  assignExercice(days) {
    this.loadingService.show("Atribuindo exercícios");

    const usersId = this.dataSourceNew.data
      .filter(({ selected }) => selected)
      .map(({ id }) => id);

    this.exerciceUserService.assignToMembers({ usersId, days }).subscribe(
      (response) => {
        this.loadingService.hide();
        this.dataSourceNew.data.forEach((item: any) => (item.selected = false));
        console.log("RESPONSE :", response);
      },
      (error) => {
        this.loadingService.hide();
      }
    );
  }

  assignExerciceToAll(days) {
    this.loadingService.show("Essa ação pode levar alguns minutos");
    this.exerciceUserService
      .assignToAllMembers({ userType: this.userType, days })
      .subscribe(
        (response) => {
          this.loadingService.hide();
        },
        (error) => {
          this.loadingService.hide();
          console.log("ERRO :", error);
        }
      );
  }
}
