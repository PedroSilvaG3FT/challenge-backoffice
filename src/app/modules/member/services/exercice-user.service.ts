import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ExerciceUserInterfaceDTO } from "../interfaces/exercice-member.interface";

@Injectable({
  providedIn: "root",
})
export class ExerciceUserService {
  constructor(private http: HttpClient) {}

  getByUserId(userId: number) {
    return this.http.get<any>(`${environment.api_url}/exerciceUser/${userId}`);
  }

  create(data: ExerciceUserInterfaceDTO) {
    return this.http.post(`${environment.api_url}/exerciceUser`, data);
  }

  removeAll(userId: number) {
    return this.http.delete<any>(
      `${environment.api_url}/exerciceUser/${userId}`
    );
  }

  assignToMembers(data) {
    return this.http.post(`${environment.api_url}/assignExercice`, data);
  }

  assignToAllMembers(data) {
    return this.http.post(`${environment.api_url}/assignExercice/all`, data);
  }
}
