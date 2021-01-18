import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { PaymentService } from '../../services/payment.service';
import { PaymentInterface } from 'app/modules/registration/interfaces/payment.interface';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})

export class PaymentComponent implements OnInit {
    public title: string = "Formas de Pagamento";

    public displayedColumns: string[] = ['id', 'name', 'action'];
    public dataSource: PaymentInterface[] = [];

    constructor(
        private paymentService: PaymentService, 
    ) { }

    ngOnInit(): void {
        this.getPayment();
    }

    getPayment(): void {
        this.paymentService
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
}