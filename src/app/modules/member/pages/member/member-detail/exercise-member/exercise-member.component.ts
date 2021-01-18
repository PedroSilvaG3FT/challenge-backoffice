import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DayEnum } from 'app/modules/registration/pages/menu/new-menu/new-menu.component';
import { DayExerciceMemberInterface, ItemExerciceMemberInterface, ExerciceUserInterfaceDTO } from 'app/modules/member/interfaces/exercice-member.interface'
import { ExerciceUserService } from 'app/modules/member/services/exercice-user.service';

@Component({
    selector: 'app-exercise-member',
    templateUrl: 'exercise-member.component.html'
})

export class ExerciseMemberComponent implements OnInit {
    @Input() userId: number;
    
    public newDay: number;
    public currtenDayId: number = 1;
    public currentDayCopy: any;

    public days: DayExerciceMemberInterface[] = [];
    
    constructor(
        public dialog: MatDialog,
        public exerciceUserService: ExerciceUserService
    ) { }

    ngOnInit() { 
        this.getExercicesMember()
    }

    getExercicesMember() {

        this.exerciceUserService
            .getByUserId(this.userId)
            .subscribe(
                response => {
                    console.log(response);
                    this.days = response;
                    this.currtenDayId = this.days.length + 1;
                },
                error => console.error("ERRO :", error)
            )
    }

    saveExercices() {
        const createExercices: ExerciceUserInterfaceDTO = {
            userId: this.userId,
            days: this.days.map(day => {
                return {
                    dayId: day.dayId,
                    exercices: day.exercices.map(exercices => {
                        return {
                            amount: exercices.amount,
                            exercice: exercices.exercice.id
                        }
                    })
                }
            })
        };

        this.exerciceUserService
            .create(createExercices)
            .subscribe(
                response => {
                    console.log(response)
                },
                error => console.error("ERROR :", error)
            )

        console.log(createExercices);
    }

    clearExercices() {
        this.exerciceUserService
            .removeAll(this.userId)
            .subscribe(
                response => {
                    this.getExercicesMember();
                },
                error => console.error("ERROR :", error)
            )
    }

    addDay() {
        if (this.currtenDayId === 8) {
            this.currtenDayId = 1;
        }

        const newDay: any = {
            dayId: this.currtenDayId,
            name: DayEnum[this.currtenDayId],
            exercices: []
        };

        this.days.push(newDay);
        this.currtenDayId++;
    }

    removeDay(index: number) {
        this.days.splice(index, 1);
        this.currtenDayId--;
    }

    addExercice(day, indexDay) {
        const newExercice: ItemExerciceMemberInterface = {
            amount: 0,
            exercice: null
        } 

        this.days[indexDay].exercices.push(newExercice);
    }

    removeExercice(indexDay: number, indexExercice: number) {
        this.days[indexDay].exercices.splice(indexExercice, 1);
    }

    onChangeExercice(result, indexDay: number, indexExercice: number) {
        this.days[indexDay].exercices[indexExercice].exercice = result;
    }

    onChangeAmount(result, indexDay: number, indexExercice: number) {
        this.days[indexDay].exercices[indexExercice].amount = result;
    }
}