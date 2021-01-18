import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PaymentInterface } from 'app/modules/registration/interfaces/payment.interface';
import { BankAccountInterface } from '../interfaces/bank-account.interface';

@Injectable({ providedIn: 'root' })

export class BankAccountService {
    public pathController: string = "bankAccount";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<BankAccountInterface[]>(`${environment.api_url}/${this.pathController}`);
    }

    create(data) {
        return this.http.post(`${environment.api_url}/${this.pathController}`, data);
    }

    delete(id: number) {
        return this.http.delete(`${environment.api_url}/${this.pathController}/${id}`);
    }
}