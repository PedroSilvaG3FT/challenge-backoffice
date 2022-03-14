import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MenuService } from "../../../services/menu.service";
import {
  MenuDayInterfaceDTO,
  MenuInterfaceDTO,
} from "../../../interfaces/menu.interface";
import { MatDialog } from "@angular/material/dialog";
import { AddMealModalComponent } from "app/modules/registration/components/modal/addMealModal/add-meal-modal.component";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItemService } from "app/modules/registration/services/menu-item.service";
import { MenuItemDTOInterface } from "app/modules/registration/interfaces/menu-item.interface";

@Component({
  selector: "app-exemple",
  templateUrl: "./new-menu.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class NewMenuComponent implements OnInit {
  public title: string = "Novo Cardapio";

  public menuId: number;
  public isNew: boolean = true;

  public newDay: number;
  public currtenDayId: number = 1;
  public currentDayCopy: MenuDayInterfaceDTO;

  public menu: MenuInterfaceDTO = {} as MenuInterfaceDTO;
  public days: MenuDayInterfaceDTO[] = [];

  constructor(
    private actvatedRoute: ActivatedRoute,
    private menuService: MenuService,
    public dialog: MatDialog,
    private router: Router,
    private menuItemService: MenuItemService
  ) {}

  ngOnInit(): void {
    this.menuId = this.actvatedRoute.snapshot.params.id;
    this.isNew = this.menuId ? false : true;

    if (!this.isNew) {
      this.getMenu();
    }
  }

  getMenu() {
    this.menuService.getById(this.menuId).subscribe(
      (response) => {
        this.menu = response;
        this.days = this.menu.days;
        console.log("RESPONSE :", response);
      },
      (error) => console.log("ERROR :", error)
    );
  }

  addDay() {
    if (this.currtenDayId === 8) {
      this.currtenDayId = 1;
    }

    const newDay: MenuDayInterfaceDTO = {
      dayId: this.currtenDayId,
      name: DayEnum[this.currtenDayId],
      meals: [],
    };

    this.days.push(newDay);
    this.currtenDayId++;
  }

  copyDay(day: MenuDayInterfaceDTO) {
    this.currentDayCopy = day;
  }

  pastDay(index) {
    this.days[index].meals = this.currentDayCopy.meals;
  }

  removeDay(day: MenuDayInterfaceDTO, index) {
    if (day.meals.length) {
      alert("CHAMA A CONFIRMAÇÃO");
    } else {
      this.days.splice(index, 1);
      this.currtenDayId--;
    }
  }

  openAddMealModal(data, indexDay: number, indexMeal?: number) {
    const dialogRef = this.dialog.open(AddMealModalComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.id) {
        const updateMenuItem = {
          id: result.id,
          descripition: result.descripition,
        } as MenuItemDTOInterface;

        this._updateMeal(updateMenuItem, indexDay, indexMeal);
      } else {
        if (this.isNew) {
          this.days[indexDay].meals.push(result);
        } else {
          const day = this.days[indexDay];

          const newMenuItem = {
            menuId: this.menuId,
            typeMealId: result.typeMealId,
            descripition: result.descripition,

            day: {
              dayId: day.dayId,
              numberDay: day.numberDay,
            },
          };

          this._createMeal(newMenuItem);
        }
      }
    });
  }

  _updateMeal(data: MenuItemDTOInterface, indexDay, indexMeal) {
    this.menuItemService.update(data).subscribe(
      (response) => {
        this.days[indexDay].meals[indexMeal].descripition = data.descripition;
        console.log("RESPONSE :", response);
      },
      (error) => console.log("ERROR :", error)
    );
  }

  _createMeal(data: MenuItemDTOInterface) {
    this.menuItemService.create(data).subscribe(
      (response) => {
        this.getMenu();
        console.log("RESPONSE :", response);
      },
      (error) => console.log("ERROR :", error)
    );
  }

  removeMeal(indexDay: number, indexMeal: number) {
    const meal = this.days[indexDay].meals[indexMeal];

    if (meal.id) {
      this.menuItemService.delete(meal.id).subscribe(
        (response) => {
          console.log("RESPONSE :", response);
          this.days[indexDay].meals.splice(indexMeal, 1);
        },
        (error) => console.log("ERROR :", error)
      );
    } else {
      this.days[indexDay].meals.splice(indexMeal, 1);
    }
  }

  editMeal(indexDay: number, indexMeal: number) {
    const meal = this.days[indexDay].meals[indexMeal];
    this.openAddMealModal(meal, indexDay, indexMeal);
  }

  saveMenu() {
    if (this.isNew) {
      this.menu.days = this.days;
      this.menuService.create(this.menu).subscribe(
        () => this.router.navigate(["registration/menu"]),
        (error) => console.error("ERROR", error)
      );
    } else {
      console.log("-- EDIT -- ");
      this.menuService.update(this.menu).subscribe(
        (response) => {
          console.log("RESPONSE :", response);
          this.router.navigate(["registration/menu"]);
        },
        (error) => console.log("ERRO :", error)
      );
    }
  }
}

export enum DayEnum {
  "Domingo" = 1,
  "Segunda-Feira" = 2,
  "Terça-Feira" = 3,
  "Quarta-Feira" = 4,
  "Quinta-Feira" = 5,
  "Sexta-Feira" = 6,
  "Sabado" = 7,
}
