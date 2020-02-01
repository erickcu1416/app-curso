import { FlowerRepository } from './../repositories/flower.repository';
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
