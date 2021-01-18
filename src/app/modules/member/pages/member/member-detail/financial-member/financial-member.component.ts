import { Component, Input, OnInit } from '@angular/core';
import { MemberInterface } from 'app/modules/member/interfaces/member.interface';
import { UserService } from 'app/modules/member/services/user.service';
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
        private userService: UserService,
        private paymentService: PaymentService, 
    ) { }


    ngOnInit(): void {
        console.log(this.member);
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

    saveUser() {
        const memberUpdateDTO: MemberInterface = {
            id: this.member.id,
            payday: this.member.payday,
            paymentId: this.member.paymentId,
        } as MemberInterface;

        this.userService
            .update(memberUpdateDTO)
            .subscribe(
                response => {
                    alert("Atualizado com Sucesso");
                },
                error => alert("Erro ao atualizar")
            )
    }

}