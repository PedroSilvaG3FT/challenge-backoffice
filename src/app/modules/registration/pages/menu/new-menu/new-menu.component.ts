import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MenuService } from '../../../services/menu.service';
import {
    MenuDayInterfaceDTO,
    MenuInterfaceDTO
} from '../../../interfaces/menu.interface'
import { MatDialog } from '@angular/material/dialog';
import { AddMealModalComponent } from 'app/modules/registration/components/modal/addMealModal/add-meal-modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exemple',
    templateUrl: './new-menu.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})

export class NewMenuComponent implements OnInit {
    public title: string = "Novo Cardapio";

    public newDay: number;
    public currtenDayId: number = 1;
    public currentDayCopy: MenuDayInterfaceDTO;

    public menu: MenuInterfaceDTO = {} as MenuInterfaceDTO;
    public days: MenuDayInterfaceDTO[] = [];

    constructor(
        private menuService: MenuService,
        private router: Router,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    addDay() {
        if (this.currtenDayId === 8) {
            this.currtenDayId = 1;
        }

        const newDay: MenuDayInterfaceDTO = {
            dayId: this.currtenDayId,
            name: DayEnum[this.currtenDayId],
            meals: []
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
        console.log("DAY", day);
        if (day.meals.length) {
            alert("CHAMA A CONFIRMAÇÃO");
        } else {
            this.days.splice(index, 1);
            this.currtenDayId--;
        }

    }

    openAddMealModal(data, index: number) {
        const dialogRef = this.dialog.open(AddMealModalComponent, { data });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return;

            this.days[index].meals.push(result);
        });
    }

    removeMeal(indexDay: number, indexMeal: number) {
        this.days[indexDay].meals.splice(indexMeal, 1);
    }

    saveMenu() {
        this.menu.days = this.days;
        this.menuService
            .create(this.menu)
            .subscribe(
                response => {
                    console.log("RESPONSE :", response);
                    this.router.navigate(['registration/menu']);
                },
                error => {
                    console.log("ERROR", error);
                }
            )
    }
}

export enum DayEnum {
    'Domingo' = 1,
    'Segunda-Feira' = 2,
    'Terça-Feira' = 3,
    'Quarta-Feira' = 4,
    'Quinta-Feira' = 5,
    'Sexta-Feira' = 6,
    'Sabado' = 7,
}