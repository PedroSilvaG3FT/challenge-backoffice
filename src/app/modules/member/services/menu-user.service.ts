import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { IAssingMenuToAll } from "../interfaces/menu-user.interface";

@Injectable({
  providedIn: "root",
})
export class MenuUserService {
  constructor(private http: HttpClient) {}

  getByUserId(id: number) {
    return this.http.get<any>(`${environment.api_url}/menuUser/${id}`);
  }

  create(data: { menuId: number; userId: number }) {
    return this.http.post(`${environment.api_url}/menuUser`, data);
  }

  updateRating(data: { menuUserItemImageId: number; rating: number }) {
    return this.http.put(`${environment.api_url}/menuUser/menuItemImage`, data);
  }

  updateFeedback(data: { menuUserItemImageId: number; feedback: string }) {
    return this.http.put(`${environment.api_url}/menuUser/menuItemImage`, data);
  }

  removeByUserId(id: number) {
    return this.http.delete(
      `${environment.api_url}/menuUser/removeByUserId/${id}`
    );
  }

  assignMenu(data: object) {
    return this.http.post<any>(`${environment.api_url}/menuUser/assign`, data);
  }

  assignMenuToAll(data: IAssingMenuToAll) {
    return this.http.post<any>(
      `${environment.api_url}/menuUser/assign/all`,
      data
    );
  }
}
