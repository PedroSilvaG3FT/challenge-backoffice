import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceInterface } from 'app/modules/registration/interfaces/exercice.interface'
import { ExerciceService } from 'app/modules/registration/services/exercice.service';
@Component({
    selector: 'app-new-exercice',
    templateUrl: 'new-exercice.component.html'
})

export class NewExerciceComponent implements OnInit {
    public title: string = "Cadastro de Exercicos";
    public exerciceId: number;
    public isNew: boolean = true;

    public exercice: ExerciceInterface = {} as ExerciceInterface;
    constructor(
        private exerciceServce: ExerciceService,
        private actvatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.exerciceId = this.actvatedRoute.snapshot.params.id;
        this.isNew = this.exerciceId ? false : true;

        if(!this.isNew) {
            this.getExercice()
        }
    }

    getExercice() {
        this.exerciceServce
            .getById(this.exerciceId)
            .subscribe(
                response => {
                    this.exercice = response;
                },
                error => console.log("ERROR :", error)
            )
    }

    save() {
        if (this.isNew) {

            this.exerciceServce
                .create(this.exercice)
                .subscribe(
                    response => {
                        console.log("RESPONSE : ", response);
                        this.router.navigate(['registration/exercice']);
                    },
                    error => console.log("ERROR :", error)
                )
        } else {
            this.exerciceServce
                .update(this.exercice)
                .subscribe(
                    response => {
                        console.log("RESPONSE : ", response);
                        this.router.navigate(['registration/exercice']);
                    },
                    error => console.log("ERROR :", error)
                ) 
        }
    }
}