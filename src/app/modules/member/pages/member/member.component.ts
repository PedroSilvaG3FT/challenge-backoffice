import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.scss"],
})
export class MemberComponent implements OnInit {
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isActive: boolean = true;
  public title: string = "Membros";
  public dataSourceNew = new MatTableDataSource();

  public displayedColumns: string[] = [
    "id",
    "name",
    "startingWeight",
    "currentWeight",
    "goalWeek",
    "goalWeight",
    "active",
    "action",
  ];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    fromEvent(this.filter.nativeElement, "keyup")
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => this._filterDataSource());

    this.setDataSource();
  }

  setDataSource(params?: any) {
    this.userService.getAll(params).subscribe(
      (response) => {
        this.dataSourceNew.data = response;
        this.dataSourceNew.paginator = this.paginator;
      },
      (error) => console.log("ERROR :", error)
    );
  }

  _filterDataSource() {
    const filterValue: string = this.filter.nativeElement.value;
    this.dataSourceNew.filter = filterValue;
  }

  goToDetail(id: number) {
    this.router.navigate(["member/member-detail", id]);
  }

  onSelectFilter(active: boolean) {
      const filterDTO = { active }
      this.setDataSource(filterDTO);
  }
}
