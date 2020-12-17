import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuDayInterfaceDTO, MenuMealInterfaceDTO } from 'app/modules/registration/interfaces/menu.interface';

@Component({
    selector: 'add-meal-modal',
    templateUrl: 'add-meal-modal.component.html'
})

export class AddMealModalComponent implements OnInit, OnDestroy {
    public typeMealSelect = TYPE_MEAL_LIST;

    public meal: MenuMealInterfaceDTO = {} as MenuMealInterfaceDTO;

    constructor(
        public dialogRef: MatDialogRef<AddMealModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MenuDayInterfaceDTO
    ) { }

    ngOnInit() {
        this._validListTypeMeal();
    }

    _validListTypeMeal() {
        const typeMealIncludesIds = this.data.meals.map(meal => meal.typeMealId);

        this.typeMealSelect.forEach((typeMeal, index) => {
            typeMealIncludesIds.forEach(include => {
                if (typeMeal.id === include) {
                    this.typeMealSelect.splice(index, 1);
                }
            });

        })
    }

    ngOnDestroy() {
        this.typeMealSelect = TYPE_MEAL_LIST;
    }

    addMeal() {
        this.meal.name = TypeMealEnum[this.meal.typeMealId];
        this.dialogRef.close(this.meal);
    }
}

export const TYPE_MEAL_LIST = [
    { id: 1, name: 'Café da Manhã' },
    { id: 2, name: 'Almoço' },
    { id: 3, name: 'Café da Tarde' },
    { id: 4, name: 'Janta' },
];

export enum TypeMealEnum {
    'Café da Manhã' = 1,
    'Almoço' = 2,
    'Café da Tarde' = 3,
    'Janta' = 4
}