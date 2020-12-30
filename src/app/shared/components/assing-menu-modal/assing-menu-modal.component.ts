import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuDayInterfaceDTO, MenuInterface } from 'app/modules/registration/interfaces/menu.interface';
import { MenuService } from 'app/modules/registration/services/menu.service';

@Component({
    selector: 'assing-menu-modal',
    templateUrl: 'assing-menu-modal.component.html'
})

export class AssingMenuModalComponent implements OnInit {
    public displayedColumns: string[] = ['id', 'name', 'qtdDays', 'active', 'action'];
    public dataSource: MenuInterface[] = [];
    
    constructor(
        private menuService: MenuService,
        public dialogRef: MatDialogRef<AssingMenuModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MenuDayInterfaceDTO
    ) { }

    ngOnInit() {
        this.getMenus();
    }

    getMenus(): void {
        this.menuService
            .getAll()
            .subscribe(
                response => this.dataSource = response,
                error => {
                    console.error("GET MENU: ", error);
                }
            )
    }

    assingMenu(menuId: number) {
        this.dialogRef.close(menuId);
    }
}