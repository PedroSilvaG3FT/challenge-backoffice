import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-member-approval',
    templateUrl: './member-approval.component.html',
})
export class MemberApprovalComponent implements OnInit {
    public title: string = "Aprovação de Membros";

    public displayedColumns: string[] = ['id', 'name', 'initalWeight', 'action'];
    public dataSource: any[] = [];

    constructor() { }

    ngOnInit(): void { 
        this.loadMembers();
    }

    loadMembers() {
        this.dataSource = [
            {id: 1, name: "Pedro Silva",initalWeight: 87, },
            {id: 2, name: "Carina Dechamps",initalWeight: 97, },
            {id: 3, name: "Eliudo Junior",initalWeight: 107, },
            {id: 4, name: "Maria Neuma",initalWeight: 90, },
        ];
    }
}
