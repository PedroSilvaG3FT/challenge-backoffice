import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
})
export class MemberComponent implements OnInit {
    public title: string = "Membros";

    public displayedColumns: string[] = ['id', 'name', 'initalWeight', 'currentWeight', 'goalWeek', 'active', 'action'];
    public dataSource: any[] = [];

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void { 
        this.loadMembers();
    }

    goToDetail(id: number) {
        this.router.navigate(['member/member-detail', id]);
    }

    loadMembers() {
        this.dataSource = [
            {id: 1, name: "Pedro Silva",initalWeight: 87, currentWeight: 75, goalWeek: 75, active: 1 },
            {id: 2, name: "Carina Dechamps",initalWeight: 97, currentWeight: 90, goalWeek: 88, active: 1 },
            {id: 3, name: "Eliudo Junior",initalWeight: 107, currentWeight: 100, goalWeek: 98, active: 1 },
            {id: 4, name: "Maria Neuma",initalWeight: 90, currentWeight: 88, goalWeek: 75, active: 1 },
        ];
    }
}
