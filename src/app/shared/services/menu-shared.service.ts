import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MenuInterface } from 'app/modules/registration/interfaces/menu.interface';

@Injectable({providedIn: 'root'})

export class MenuSharedService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<MenuInterface[]>(`${environment.api_url}/menu`);
    }
    
}