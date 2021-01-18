import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PaymentInterface } from 'app/modules/registration/interfaces/payment.interface';
@Injectable({ providedIn: 'root' })

export class PaymentService {
    public pathController: string = "payment";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<PaymentInterface[]>(`${environment.api_url}/${this.pathController}`);
    }

    getById(id: number) {
        return this.http.get<PaymentInterface>(`${environment.api_url}/${this.pathController}/${id}`);
    }
}