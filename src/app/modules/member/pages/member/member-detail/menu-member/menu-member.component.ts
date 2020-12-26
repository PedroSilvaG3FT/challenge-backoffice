import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuUserService } from 'app/modules/member/services/menu-user.service';
import { MenuDayInterfaceDTO, MenuInterfaceDTO } from 'app/modules/registration/interfaces/menu.interface';
import { MenuService } from 'app/modules/registration/services/menu.service';

@Component({
    selector: 'app-menu-member',
    templateUrl: './menu-member.component.html',
})
export class MenuMemberComponent implements OnInit {
    @Input() userId: number;

    public newDay: number;
    public currtenDayId: number = 1;
    public currentDayCopy: MenuDayInterfaceDTO;

    public menu: MenuInterfaceDTO = {} as MenuInterfaceDTO;
    public days: any[] = [];

    constructor(
        private menuUserService: MenuUserService,
        private router: Router,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void { 
        this.getMenuUser();
    }

    getMenuUser(): void {
        this.menuUserService
            .getByUserId(this.userId)
            .subscribe(
                response => {
                    this.days = response.days;
                    console.log("MENU USER :", response);
                },
                error => {
                    console.error("ERRO AO BUSCAR MENU USER", error);
                }
            )
    }
}
