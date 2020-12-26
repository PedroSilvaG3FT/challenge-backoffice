import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent implements OnInit {
    public title: string = "Detalhes Membro";

    public displayedColumns: string[] = ['id', 'name', 'initalWeight', 'currentWeight', 'goalWeek', 'active', 'action'];
    public dataSource: any[] = [];

    public userId: number;

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void { 
        this.userId = this.activatedRoute.snapshot.params.id;
        console.log("USER ID :", this.userId);
    }
}
