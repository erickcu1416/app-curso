import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

    constructor(private geolocation: Geolocation,
                private nativeStorage: NativeStorage,
                private platform: Platform) {}

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition().then((resp) => {
                const coords = {
                    lat: resp.coords.latitude,
                    lng: resp.coords.longitude,
                };

                if (this.platform.is('cordova')) {
                    console.log('Se guarda en el Dispositivo Nativo');
                    this.setCoordsNative(coords);

                } else {
                    console.log('Se guarda en el explorador');
                    this.setCoordsPWA(coords);
                }

                console.log(coords);
                resolve(coords);

               }).catch((error) => {
                    reject(error);
                    console.log('Error getting location', error);
               });
        });
    }

    getCoords() {
        if (this.platform.is('cordova')) {
            console.log('Se guarda en el Dispositivo Nativo');
            return this.getCoordsNative();

        } else {
            console.log('Se guarda en el explorador');
            return this.getCoordsPWA();

        }
    }

    private setCoordsNative(coords) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.setItem('coords', coords)
                .then(
                    () => resolve(coords),
                    error => reject(error)
                );
        });
    }

    private getCoordsNative() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('coords')
                .then(
                    (coords) => resolve(coords),
                    error => reject(error)
                );
        });
    }

    private setCoordsPWA(coords) {
        return new Promise((resolve, reject) => {
            localStorage.setItem('coords',  JSON.stringify(coords));
            resolve(coords);
        });
    }

    private getCoordsPWA() {
        return new Promise(async (resolve, reject) => {
            const coords = await localStorage.getItem('coords');
            resolve(coords);
        });
    }

}
