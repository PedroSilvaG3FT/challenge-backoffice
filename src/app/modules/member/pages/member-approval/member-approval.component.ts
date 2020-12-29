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
        this.userService
            .getAll()
            .subscribe(
                response => {
                    this.dataSource = response.filter(user => !user.active);
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
}
