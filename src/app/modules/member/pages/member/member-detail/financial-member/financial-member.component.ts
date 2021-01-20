import { Component, Input, OnInit } from '@angular/core';
import { MemberInterface } from 'app/modules/member/interfaces/member.interface';
import { PaymentUserService } from 'app/modules/member/services/payment-user.service';
import { UserService } from 'app/modules/member/services/user.service';
import { PaymentInterface } from 'app/modules/registration/interfaces/payment.interface';
import { PaymentService } from 'app/modules/registration/services/payment.service';
import { isFuture, isPast } from 'date-fns';

@Component({
    selector: 'app-financial-member',
    templateUrl: 'financial-member.component.html'
})

export class FinancialMemberComponent implements OnInit {
    @Input() member: MemberInterface;
    @Input() userId: number;

    public displayedColumns: string[] = ['numberPlot', 'value', 'status', 'dueDate', 'action'];
    public dataSource: any[] = [];

    public paymentOptions: PaymentInterface[] = [];
    
    constructor(
        private userService: UserService,
        private paymentService: PaymentService, 
        private paymentUserService: PaymentUserService, 
    ) { }

    ngOnInit(): void {
        this._getPaymentOptions();
        this.getPaymentMember();
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

    getPaymentMember(): void {
        this.paymentUserService
            .getByUserId(this.userId)
            .subscribe(
                response => {
                    this.dataSource = response;

                    this.dataSource.forEach((item) => {
                        let newDueDate = new Date(item.dueDate);

                        if (!item.active) {
                            item.status = "Pago";
                            return;
                        };

                        if (isFuture(newDueDate)) item.status = "Pendente";
                        if (isPast(newDueDate) && item.active) item.status = "Atrasada";
                    })
                },
                error => {
                    console.log("ERROR :", error);
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

    updatePlot(id: number) {
        this.paymentUserService
            .update({
                id,
                active: false,
                paymentId: this.member.paymentId
            })
            .subscribe(
                response => {
                    this.getPaymentMember();
                },
                error => {
                    console.log("ERROR :", error);
                }
            )
    }

}