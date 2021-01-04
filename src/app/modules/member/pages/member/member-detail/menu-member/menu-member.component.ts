import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuUserService } from 'app/modules/member/services/menu-user.service';
import { MenuDayInterfaceDTO, MenuInterfaceDTO } from 'app/modules/registration/interfaces/menu.interface';
import { AssingMenuModalComponent } from 'app/shared/components/assing-menu-modal/assing-menu-modal.component';

@Component({
    selector: 'app-menu-member',
    templateUrl: './menu-member.component.html',
    styleUrls: ['./menu-member.component.scss']
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
                },
                error => {
                    console.error("ERRO AO BUSCAR MENU USER", error);
                }
            )
    }

    openAssignMenuModal(): void {
        const dialogRef = this.dialog.open(AssingMenuModalComponent, {
            width: "70%"
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return;
            this.assignMenu(result);
        });
    }

    assignMenu(menuId: number): void {
        const assignMenuDTO = {
            userId: this.userId,
            menuId: menuId,
        };

        this.menuUserService
            .create(assignMenuDTO)
            .subscribe(
                response => {
                    this.getMenuUser();
                },
                error => console.error("ERROR", error)
            )
    }
    
}
