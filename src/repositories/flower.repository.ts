import { IFlower } from './../utils/models/flower.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FlowerRepository {

    constructor(private http: HttpClient) {}

    getFlowers() {
        return this.http.get<IFlower[]>('/assets/data/flowers.json');
    }
}
