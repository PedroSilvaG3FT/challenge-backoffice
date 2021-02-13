import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-member-approval',
    templateUrl: './member-approval.component.html',
})
export class MemberApprovalComponent implements OnInit {
    public title: string = "Aprovação de Membros";

    public displayedColumns: string[] = ['id', 'name', 'startingWeight', 'action'];
    public dataSource: any[] = [];

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void { 
        this.setDataSource();
    }

    setDataSource() {
        const params = {
            active: false
        };

        this.userService
            .getAll(params)
            .subscribe(
                response => {
                    console.log("RESPONSE :", response);
                    this.dataSource = response.filter(user => !user.payday)
                },
                error => console.log("ERROR :", error)
            )
    }

    approveMember(member) {
        member.active = true;
        
        this.userService
            .update(member)
            .subscribe(
                response => {
                    this.setDataSource();
                },
                error => {
                    console.log("ERROR :", error);
                }
            )
    }

    reproveMember(id) {
        this.userService
            .reprove(id)
            .subscribe(
                response => {
                    this.setDataSource();
                },
                error => {
                    console.log("ERROR :", error);
                }
            )
    }
}
