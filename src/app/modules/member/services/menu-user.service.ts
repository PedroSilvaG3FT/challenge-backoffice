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

    create(data: { menuId: number, userId: number }) {
        return this.http.post(`${environment.api_url}/menuUser`, data);
    }

    updateRating(data: { menuUserItemImageId: number, rating: number }) {
        return this.http.put(`${environment.api_url}/menuUser/menuItemImage`, data);
    }
}