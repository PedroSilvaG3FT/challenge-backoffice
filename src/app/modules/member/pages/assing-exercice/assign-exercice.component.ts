import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ExerciceUserService } from "../../services/exercice-user.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AssignExerciceMemberComponent } from "../../components/assign-exercice-member/assign-exercice-member.component";

@Component({
  selector: "assign-exercice",
  templateUrl: "assign-exercice.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AssignExerciceComponent implements OnInit {
  public title: string = "Atribuir Exercicios";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
    private exerciceUserService: ExerciceUserService
  ) {}

  ngOnInit(): void {
    this.setDataSource();
  }

  get isDisabled() {
    return !this.dataSourceNew.data.some(({ selected }) => selected);
  }

  setDataSource(params?: any) {
    this.userService.getAll(params).subscribe(
      (response) => {
        this.dataSourceNew.data = response.map((member) => ({
          ...member,
          selected: false,
        }));
        this.dataSourceNew.paginator = this.paginator;
      },
      (error) => console.log("ERROR :", error)
    );
  }

  openModalAssign(): void {
    const dialogRef = this.dialog.open(AssignExerciceMemberComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.assignExercice(result);
    });
  }

  assignExercice(days) {
    const usersId = this.dataSourceNew.data
      .filter(({ selected }) => selected)
      .map(({ id }) => id);

    this.exerciceUserService.assignToMembers({ usersId, days }).subscribe(
      (response) => {
        this.dataSourceNew.data.forEach((item: any) => (item.selected = false));
        console.log("RESPONSE :", response);
      },
      (error) => {
        console.log("ERRO :", error);
      }
    );
  }
}
