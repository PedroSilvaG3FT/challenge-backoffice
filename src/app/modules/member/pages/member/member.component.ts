import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
})
export class MemberComponent implements OnInit {
    public title: string = "Membros";

    public displayedColumns: string[] = ['id', 'name', 'startingWeight', 'currentWeight', 'goalWeek', 'active', 'action'];
    public dataSource: any[] = [];

    constructor(
        private router: Router,
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
                    console.log("RESPONSE ", response);
                    this.dataSource = response.filter(user => user.active);
                },
                error => console.log("ERROR :", error)
            )
    }


    goToDetail(id: number) {
        this.router.navigate(['member/member-detail', id]);
    }
}
