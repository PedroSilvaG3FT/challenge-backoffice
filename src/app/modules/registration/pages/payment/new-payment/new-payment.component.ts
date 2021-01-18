import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'app/modules/registration/services/payment.service';
import { PaymentInterface } from 'app/modules/registration/interfaces/payment.interface';

@Component({
    selector: 'app-new-exercice',
    templateUrl: 'new-payment.component.html'
})

export class NewPaymentComponent implements OnInit {
    public title: string = "Cadastro de Formas de Pagamento";
    public paymentId: number;
    public isNew: boolean = true;

    public payment: PaymentInterface = {} as PaymentInterface;

    constructor(
        private paymentService: PaymentService,
        private actvatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.paymentId = this.actvatedRoute.snapshot.params.id;
        this.isNew = this.paymentId ? false : true;

        if (!this.isNew) {
            this.getPayment()
        }
    }

    getPayment() {
        this.paymentService
            .getById(this.paymentId)
            .subscribe(
                response => {
                    this.payment = response;
                },
                error => console.log("ERROR :", error)
            )
    }
}