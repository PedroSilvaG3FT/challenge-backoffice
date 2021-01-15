import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { MenuItemDTOInterface } from '../interfaces/menu-item.interface';

@Injectable({ providedIn: 'root' })

export class MenuItemService {
    public pathController = "menuItem";

    constructor(private http: HttpClient) { }

    create(menu: MenuItemDTOInterface) {
        return this.http.post(`${environment.api_url}/${this.pathController}`, menu);
    }

    update(menu: MenuItemDTOInterface) {
        return this.http.put(`${environment.api_url}/${this.pathController}/${menu.id}`, menu);
    }

    delete(id: number) {
        return this.http.delete(`${environment.api_url}/${this.pathController}/${id}`);
    }
}