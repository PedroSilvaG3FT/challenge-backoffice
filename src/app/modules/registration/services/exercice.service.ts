import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ExerciceInterface } from '../interfaces/exercice.interface';

@Injectable({ providedIn: 'root' })

export class ExerciceService {
    public pathController: string = "exercice";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<ExerciceInterface[]>(`${environment.api_url}/${this.pathController}`);
    }

    getById(id: number) {
        return this.http.get<ExerciceInterface>(`${environment.api_url}/${this.pathController}/${id}`);
    }

    create(exercice: ExerciceInterface) {
        return this.http.post<any>(`${environment.api_url}/${this.pathController}`, exercice);
    }

    update(exercice: ExerciceInterface) {
        return this.http.put(`${environment.api_url}/${this.pathController}/${exercice.id}`, exercice);
    }

    delete(id: number) {
        return this.http.delete(`${environment.api_url}/${this.pathController}/${id}`);
    }

    getByName(name: string) {
        return this.http.get<ExerciceInterface[]>(`${environment.api_url}/exerciceByName?name=${name}`);
    }
}