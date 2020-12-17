import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-exemple',
    templateUrl: './exemple.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ExempleComponent implements OnInit {
    public title: string = "ExempleComponent";

    constructor() { }

    ngOnInit(): void { }
}