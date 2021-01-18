import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MenuService } from '../../services/menu.service';
import { MenuInterface } from '../../interfaces/menu.interface'

@Component({
    selector: 'app-exemple',
    templateUrl: './payment.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class PaymentComponent implements OnInit {
    public title: string = "Formas de Pagamento";

    public displayedColumns: string[] = ['id', 'name', 'active', 'action'];
    public dataSource: MenuInterface[] = [];

    constructor(
        private menuService: MenuService
    ) { }

    ngOnInit(): void {
        this.getPayment();
    }

    getPayment(): void {
        this.menuService
            .getAll()
            .subscribe(
                response => {
                    this.dataSource = response;
                    console.log(this.dataSource);
                },
                error => {
                    console.error("GET MENU: ", error);
                }
            )
    }

    disablePayment(id: number): void {
        this.menuService
            .disable(id)
            .subscribe(
                response => console.log(this.dataSource),
                error => {
                    this.getPayment();
                    console.error("GET MENU: ", error);
                }
            )
    }

    deletePayment(id: number): void {
        this.menuService
            .delete(id)
            .subscribe(
                response => {
                    console.log("RESPONSE :", response);
                    this.getPayment();
                },
                error => console.log("ERROR :", error)
            )
    }
}