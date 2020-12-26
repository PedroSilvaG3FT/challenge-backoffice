import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})

export class MenuUserService {

    constructor(private http: HttpClient) { }

    getByUserId(id: number) {
        return this.http.get<any>(`${environment.api_url}/menuUser/${id}`)
    }
}