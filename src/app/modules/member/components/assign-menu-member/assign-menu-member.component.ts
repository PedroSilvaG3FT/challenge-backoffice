import { fromEvent } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "assign-menu-member",
  templateUrl: "assign-menu-member.component.html",
  styleUrls: ["./assign-menu-member.component.scss"],
})
export class AssignMenuMemberComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  public selectedMember = [];
  public dataSourceNew = new MatTableDataSource();
  public displayedColumns: string[] = [
    "name",
    "startingWeight",
    "currentWeight",
    "goalWeek",
    "goalWeight",
    "action",
  ];

  constructor(
    public dialogRef: MatDialogRef<AssignMenuMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    fromEvent(this.filter.nativeElement, "keyup")
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => this._filterDataSource());

    this.setDataSource();
  }

  get title() {
    return `Atribuir Cárdapio ${this.data.menuName}`;
  }

  setDataSource() {
    this.dataSourceNew.data = this.data.members;
    this.dataSourceNew.paginator = this.paginator;
  }

  _filterDataSource() {
    this.dataSourceNew.filter = this.filter.nativeElement.value;

    this.dataSourceNew.data = this.data.members.filter((member: any) => {
      return !this.selectedMember.some(({ id }) => id === member.id);
    });
  }

  addMember(member) {
    this.selectedMember.push(member);
    this._filterDataSource();
  }

  removeMember(index: number) {
    this.selectedMember.splice(index, 1);
    this._filterDataSource();
  }

  handleSave() {
    const memberIds = this.selectedMember.map(({ id }) => id);
    this.dialogRef.close(memberIds);
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
