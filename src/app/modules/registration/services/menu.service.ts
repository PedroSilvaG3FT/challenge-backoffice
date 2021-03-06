import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MenuInterface, MenuInterfaceDTO } from '../interfaces/menu.interface';

@Injectable({providedIn: 'root'})

export class MenuService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<MenuInterface[]>(`${environment.api_url}/menu`);
    }

    getById(id: number) {
        return this.http.get<MenuInterfaceDTO>(`${environment.api_url}/menu/${id}`);
    }
    
    create(menu) {
        return this.http.post(`${environment.api_url}/menu`, menu);
    }

    update(menu) {
        return this.http.put(`${environment.api_url}/menu`, menu);
    }

    disable(id: number) {
        return this.http.put(`${environment.api_url}/menu/${id}`, {});
    }

    delete(id: number) {
        return this.http.delete(`${environment.api_url}/menu/${id}`);
    }
}