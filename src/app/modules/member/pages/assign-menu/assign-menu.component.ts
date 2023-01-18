import { ActivatedRoute } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MenuUserService } from "../../services/menu-user.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MenuService } from "app/modules/registration/services/menu.service";
import { MenuInterface } from "app/modules/registration/interfaces/menu.interface";
import { AssignMenuMemberComponent } from "../../components/assign-menu-member/assign-menu-member.component";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { LoadingService } from "@fuse/components/loading/loading.service";

@Component({
  selector: "assign-menu",
  templateUrl: "assign-menu.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AssignMenuComponent implements OnInit {
  public title: string = "Atribuir Cardapio";

  public members = [];
  public userType: number;
  public isLoading: boolean = false;
  public dataSource: MenuInterface[] = [];
  public displayedColumns: string[] = ["id", "name", "qtdDays", "action"];

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private menuService: MenuService,
    private userService: UserService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private menuUserService: MenuUserService
  ) // private loadingService: FuseProgressBarService
  {}

  ngOnInit(): void {
    this.getMembers();
    this.getMenus();

    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 5000);
  }

  getMembers() {
    this.activatedRoute.data.subscribe(({ userType }) => {
      this.userType = Number(userType);
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
      else if (result.isSaveAll) this.assignToAll(id);
      else if (result.memberIds.length) this.assignMenu(result.memberIds, id);
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

  assignToAll(menuId: number) {
    this.menuUserService
      .assignMenuToAll({ menuId, userType: this.userType })
      .subscribe(
        (response) =>
          this.snackBar.open(response.message, null, { duration: 3500 }),
        () =>
          this.snackBar.open("Ocorreu um erro ao atribuir cardapio", null, {
            duration: 3500,
          })
      );
  }
}
