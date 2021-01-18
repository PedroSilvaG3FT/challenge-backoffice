import { Component, Input, OnInit } from '@angular/core';
import { MemberInterface } from 'app/modules/member/interfaces/member.interface';
import { PaymentInterface } from 'app/modules/registration/interfaces/payment.interface';
import { PaymentService } from 'app/modules/registration/services/payment.service';

@Component({
    selector: 'app-financial-member',
    templateUrl: 'financial-member.component.html'
})

export class FinancialMemberComponent implements OnInit {
    @Input() member: MemberInterface;

    public paymentOptions: PaymentInterface[] = [];
    
    constructor(
        private paymentService: PaymentService, 
    ) { }


    ngOnInit(): void {
        this._getPaymentOptions();
    }

    _getPaymentOptions(): void {
        this.paymentService
            .getAll()
            .subscribe(
                response => {
                    this.paymentOptions = response;
                },
                error => {
                    console.error("GET SELECT: ", error);
                }
            )
    }

}