import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberInterface } from 'app/modules/member/interfaces/member.interface';
import { UserService } from 'app/modules/member/services/user.service';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent implements OnInit {
    public title: string = "Detalhes Membro";
    public displayedColumns: string[] = ['id', 'name', 'initalWeight', 'currentWeight', 'goalWeek', 'active', 'action'];

    public userId: number;
    public member: MemberInterface = {} as MemberInterface;

    constructor(
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void { 
        this.userId = this.activatedRoute.snapshot.params.id;
        this._getUser();
    }

    _getUser() {
        console.log("OPA")
        this.userService
            .getById(this.userId)
            .subscribe(
                response => {
                    this.member = response;
                    console.log("RESPONSE :", response);
                },
                error => {
                    console.log("Error :", error);
                }
            )
    }

    saveUser() {
        this.userService
            .update(this.member)
            .subscribe(
                response => {
                    alert("Atualizado com Sucesso");
                    this.router.navigate(['member/list'])
                },
                error => alert("Erro ao atualizar")
            )
    }
}
