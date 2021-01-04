import { Component, OnInit } from '@angular/core';
import { ExerciceInterface } from '../../interfaces/exercice.interface';
import { ExerciceService } from '../../services/exercice.service';

@Component({
    selector: 'app-exercice',
    templateUrl: 'exercice.component.html'
})

export class ExerciceComponent implements OnInit {
    public title: string = "Exercícios";

    public displayedColumns: string[] = ['id', 'name', 'action'];
    public dataSource: ExerciceInterface[] = [];

    constructor(
        private exerciceService: ExerciceService
    ) { }

    ngOnInit(): void {
        this.setDataSource();
    }

    setDataSource(): void {
        this.exerciceService
            .getAll()
            .subscribe(
                response => {
                    this.dataSource = response;
                    console.log(this.dataSource);
                },
                error => {
                    console.error("GET MENU: ", error);
                }
            )
    }

    deleteMenu(id: number): void {
        this.exerciceService
            .delete(id)
            .subscribe(
                response => {
                    console.log("RESPONSE :", response);
                    this.setDataSource();
                },
                error => console.log("ERROR :", error)
            )
    }
}