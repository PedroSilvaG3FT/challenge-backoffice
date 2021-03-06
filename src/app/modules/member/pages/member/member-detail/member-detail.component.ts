import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberInterface } from 'app/modules/member/interfaces/member.interface';
import { UserService } from 'app/modules/member/services/user.service';
import { AngularEditorConfigShared } from 'app/shared/config/angular-editor/angular-editor-config';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent implements OnInit {
    public title: string = "Detalhes Membro";
    public displayedColumns: string[] = ['id', 'name', 'initalWeight', 'currentWeight', 'goalWeek', 'active', 'action'];

    public userId: number;
    public member: MemberInterface = {} as MemberInterface;
    
    public angularEditorConfigShared = new AngularEditorConfigShared();
    public configEditor = this.angularEditorConfigShared.default();
    
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
        this.userService
            .getById(this.userId)
            .subscribe(
                response => {
                    this.member = response;
                },
                error => {
                    console.error("Error :", error);
                }
            )
    }

    saveUser() {
        this.member.goalWeek = Number(this.member.goalWeek);
        
        const memberUpdateDTO: MemberInterface = {
            id: Number(this.member.id),
            goalWeek: Number(this.member.goalWeek),
            goalWeight: Number(this.member.goalWeight),
        } as MemberInterface;

        this.userService
            .update(memberUpdateDTO)
            .subscribe(
                response => {
                    alert("Atualizado com Sucesso");
                    this.router.navigate(['member/list'])
                },
                error => alert("Erro ao atualizar")
            )
    }

    removeUser() {
        this.userService
            .delete(this.userId)
            .subscribe(
                response => {
                    alert("Removido com Sucesso");
                    this.router.navigate(['member/list'])
                },
                error => alert("Erro ao atualizar")
            )
    }
}
