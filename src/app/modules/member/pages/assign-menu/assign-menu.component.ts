import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MenuService } from "app/modules/registration/services/menu.service";
import { MenuInterface } from "app/modules/registration/interfaces/menu.interface";
import { AssignMenuMemberComponent } from "../../components/assign-menu-member/assign-menu-member.component";
import { MenuUserService } from "../../services/menu-user.service";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "assign-menu",
  templateUrl: "assign-menu.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AssignMenuComponent implements OnInit {
  public title: string = "Atribuir Cardapio";

  public displayedColumns: string[] = ["id", "name", "qtdDays", "action"];
  public dataSource: MenuInterface[] = [];
  public userType: number;
  public members = [];

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private menuService: MenuService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private menuUserService: MenuUserService
  ) {}

  ngOnInit(): void {
    this.getMembers();
    this.getMenus();
  }

  getMembers() {
    this.activatedRoute.data.subscribe(({ userType }) => {
      this.userService.getAll({ active: true, userType }).subscribe(
        (response) => (this.members = response),
        (error) =>
          this.snackBar.open("Ocorreu um erro ao buscar usuários", null, {
            duration: 3500,
          })
      );
    });
  }

  getMenus(): void {
    this.menuService.getAll().subscribe(
      (response) => (this.dataSource = response),
      (error) =>
        this.snackBar.open("Ocorreu um erro ao buscar menus", null, {
          duration: 3500,
        })
    );
  }

  openModalMembers({ id, name: menuName }: MenuInterface): void {
    const data = { menuName, members: this.members };
    const dialogRef = this.dialog.open(AssignMenuMemberComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.assignMenu(result, id);
    });
  }

  assignMenu(members, menuId: number) {
    this.menuUserService.assignMenu({ members, menuId }).subscribe(
      (response) =>
        this.snackBar.open(response.message, null, { duration: 3500 }),
      () =>
        this.snackBar.open("Ocorreu um erro ao atribuir cardapio", null, {
          duration: 3500,
        })
    );
  }
}
