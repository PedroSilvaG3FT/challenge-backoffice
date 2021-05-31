import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  MenuDayInterfaceDTO,
  MenuInterface,
} from "app/modules/registration/interfaces/menu.interface";
import { MenuService } from "app/modules/registration/services/menu.service";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "assing-menu-modal",
  templateUrl: "assing-menu-modal.component.html",
})
export class AssingMenuModalComponent implements OnInit {
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public displayedColumns: string[] = ["id", "name", "qtdDays", "action"];
  public dataSourceNew = new MatTableDataSource();
  public dataSource: MenuInterface[] = [];

  constructor(
    private menuService: MenuService,
    public dialogRef: MatDialogRef<AssingMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuDayInterfaceDTO
  ) {}

  ngOnInit() {
    fromEvent(this.filter.nativeElement, "keyup")
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe(() => this._filterDataSource());

    this.getMenus();
  }

  _filterDataSource() {
    const filterValue: string = this.filter.nativeElement.value;
    this.dataSourceNew.filter = filterValue;
  }

  getMenus(): void {
    this.menuService.getAll().subscribe(
      (response) => {
        this.dataSource = response;
        this.dataSourceNew.data = response;
        this.dataSourceNew.paginator = this.paginator;
      },
      (error) => {
        console.error("GET MENU: ", error);
      }
    );
  }

  assingMenu(menuId: number) {
    this.dialogRef.close(menuId);
  }
}
