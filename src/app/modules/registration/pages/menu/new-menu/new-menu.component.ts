import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MenuService } from '../../../services/menu.service';
import {
    MenuDayInterfaceDTO,
    MenuInterface,
    MenuInterfaceDTO
} from '../../../interfaces/menu.interface'
import { toArray } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { AddMealModalComponent } from 'app/modules/registration/components/modal/addMealModal/add-meal-modal.component';

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

    public menu: MenuInterfaceDTO = {} as MenuInterfaceDTO;
    public days: MenuDayInterfaceDTO[] = [];

    constructor(
        private menuService: MenuService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void { }

    addDay() {
        if(this.currtenDayId === 8) {
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

    openAddMealModal(data, index: number) {
        const dialogRef = this.dialog.open(AddMealModalComponent, { data });

        dialogRef.afterClosed().subscribe(result => {
            console.log("Result :", result);
            if(!result) return;
            
            this.days[index].meals.push(result);
        });
    }

    removeMeal(indexDay: number, indexMeal:number) {
        this.days[indexDay].meals.splice(indexMeal, 1);
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