import { FlowerRepository } from './../repositories/flower.repository';
import { IFlower } from './../utils/models/flower.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  constructor(private _flowerRepository: FlowerRepository) {
  }

  getFlowers() {
    return this._flowerRepository.getFlowers();
  }

}
