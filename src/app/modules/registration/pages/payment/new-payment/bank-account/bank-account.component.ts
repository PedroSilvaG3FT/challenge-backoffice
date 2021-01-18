import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BankAccountInterface } from 'app/modules/registration/interfaces/bank-account.interface';
import { BankAccountService } from 'app/modules/registration/services/bank-account.service';

@Component({
    selector: 'app-bank-account-form',
    templateUrl: './bank-account.component.html'
})

export class BankAccountComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;

    public newBankAccount: BankAccountInterface = {} as BankAccountInterface;

    public displayedColumns: string[] = ['bank', 'agency', 'account', 'document', 'nameOwner', 'action'];
    public dataSource: BankAccountInterface[] = [];
    
    constructor(
        private bankAccountService: BankAccountService
    ) { }

    ngOnInit() { 
        this.getAccount();
    }

    getAccount() {
        this.bankAccountService
            .getAll()
            .subscribe(
                response => {
                    this.dataSource = response;
                },
                error => {
                    console.log("ERROR :", error);
                }
            )
    }

    addAccount() {
        this.bankAccountService
            .create(this.newBankAccount)
            .subscribe(
                response => {
                    alert("Criado com sucesso");
                    this.getAccount();
                    this.accordion.closeAll();
                    this.newBankAccount = {} as BankAccountInterface;
                },
                error => {
                    console.log("ERRO :", error);
                }
            )
    }

    removeAccount(id: number) {
        this.bankAccountService
            .delete(id)
            .subscribe(
                response => {
                    this.getAccount();
                    alert("Removido com sucesso");
                },
                error => {
                    console.log("ERRO :", error);
                }
            )
    }
}