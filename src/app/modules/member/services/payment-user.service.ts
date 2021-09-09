import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PaymentMemberInterface } from 'app/modules/member/interfaces/payment-member.interface';

@Injectable({
    providedIn: 'root'
})

export class PaymentUserService {
    public pathController = "userPayment";

    constructor(private http: HttpClient) { }

    getByUserId(userId: number) {
        return this.http.get<PaymentMemberInterface[]>(`${environment.api_url}/${this.pathController}/user/${userId}`);
    }

    create(data: { userId: number, payday: number, paymentId: number }) {
        return this.http.post(`${environment.api_url}/${this.pathController}`, data);
    }

    update(data: { id: number, paymentId: number, active: boolean }) {
        return this.http.put(`${environment.api_url}/${this.pathController}`, data);
    }
}