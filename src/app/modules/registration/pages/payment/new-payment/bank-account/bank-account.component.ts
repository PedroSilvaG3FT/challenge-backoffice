import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BankAccountInterface } from 'app/modules/registration/interfaces/bank-account.interface';

@Component({
    selector: 'app-bank-account-form',
    templateUrl: './bank-account.component.html'
})

export class BankAccountComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;

    public newBankAccount: BankAccountInterface = {} as BankAccountInterface;

    public displayedColumns: string[] = ['id', 'bank', 'agency', 'account', 'document', 'nameOwner', 'action'];
    public dataSource: BankAccountInterface[] = [];
    
    constructor() { }

    ngOnInit() { }

    addAccount() {
        console.log("NEW :", this.newBankAccount);
    }
}