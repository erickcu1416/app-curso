import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

    constructor(private geolocation: Geolocation) {}

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition().then((resp) => {
                const coords = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                };

                console.log(coords);
                resolve(coords);

               }).catch((error) => {
                    reject(error);
                    console.log('Error getting location', error);
               });
        });
    }

}
