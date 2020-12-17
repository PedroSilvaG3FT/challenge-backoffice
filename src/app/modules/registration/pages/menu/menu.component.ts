import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MenuService } from '../../services/menu.service';
import { MenuInterface } from '../../interfaces/menu.interface'

@Component({
    selector: 'app-exemple',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class MenuComponent implements OnInit {
    public title: string = "Cardapios";

    public displayedColumns: string[] = ['id', 'name', 'qtdDays', 'active'];
    public dataSource: MenuInterface[] = [];

    constructor(
        private menuService: MenuService
    ) { }

    ngOnInit(): void { 
        this.getMenus();
    }

    getMenus(): void {
        this.menuService
            .getAll()
            .subscribe(
                response => {
                    this.dataSource = response;
                },
                error => {
                    console.error("GET MENU: ", error);
                }
            )
    }
}