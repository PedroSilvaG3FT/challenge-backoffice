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
    public menuUser: any;
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
                    this.menuUser = response;
                    this.days = this.menuUser.days;
                    console.log("response", response)
                },
                error => {
                    this.days = []
                    this.menuUser = null
                    console.log("ERRO AO BUSCAR MENU USER "+ error);
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

    onChangeRating(value, itemId): void {        
        this.menuUserService
            .updateRating({
                menuUserItemImageId: itemId,
                rating: value
            })
            .subscribe(
                response => {
                    console.log("RESPONSE :", response);
                },
                error => {
                    console.log("ERROR :", error)
                }
            )
    }

    clearMenuUser(){
        this.menuUserService
            .removeByUserId(this.userId)
            .subscribe(
                response => {
                    this.getMenuUser();
                },
                error => console.error("ERROR", error)
            )
    }
    
}
