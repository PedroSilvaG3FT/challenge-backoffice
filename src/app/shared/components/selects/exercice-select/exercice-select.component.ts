import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ExerciceInterface } from 'app/modules/registration/interfaces/exercice.interface';
import { ExerciceService } from 'app/modules/registration/services/exercice.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-exercice-select',
    templateUrl: 'exercice-select.component.html'
})

export class ExerciceSelectComponent implements OnInit {
    @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger }) inputAutoComplete: MatAutocompleteTrigger;

    @ViewChild('inputRef', { static: true }) inputRef: ElementRef;

    @Input() value: any;
    @Input() attributeName: string;
    @Input() readonly: boolean;
    @Output() changedValue = new EventEmitter();

    public options: ExerciceInterface[] = [{name: "OPA"}];
    public filterValue: string = "";
    public qtdResult: number = 0;

    constructor(
        private exerciceService: ExerciceService
    ) { }

    ngOnInit() {
        this.inputRef.nativeElement.value = this.value;
        this.getExercices();
    }

    initFilter() {

        fromEvent(this.inputRef.nativeElement, 'keyup')
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe(() => {
                this.filterValue = this.inputRef.nativeElement.value;
                this.getExercices();
            });
    }

    getExercices() {
        this.exerciceService
            .getByName(this.filterValue)
            .subscribe(
                response => {
                    this.initFilter();
                    this.options = response;
                    this.qtdResult = this.options.length;

                    if(!this.qtdResult) {
                        this.inputAutoComplete.openPanel();
                    }
                },
                error => {
                    console.error("GET Exercice: ", error);
                }
            )
    }

    onChange($event: MatAutocompleteSelectedEvent) {
        const selectedValue = $event.option.value;
        const filteredValue = this.options.filter(option => option.id === selectedValue)[0];
        const selectResult: any = {
            name: filteredValue.name,
            id: filteredValue.id
        }

        this.inputRef.nativeElement.value = filteredValue.name; 
        this.changedValue.emit(selectResult);
    }

    registerExercice() {
        const newExercice = {
            name: this.filterValue
        }

        this.exerciceService
            .create(newExercice)
            .subscribe(
                response => {
                    const selectResult: any = {
                        name: this.filterValue,
                        id: response.newExerciceId
                    }

                    this.changedValue.emit(selectResult);
                    this.inputAutoComplete.closePanel();
                },
                error => console.log("ERROR :", error)
            )
    }
}