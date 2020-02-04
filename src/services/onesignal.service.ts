import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

    constructor(private platform: Platform, private oneSignal: OneSignal) {}

    loadOneSignal() {
        if (this.platform.is('cordova')) {

            this.oneSignal.startInit('2d36585b-b8f1-4711-8996-c8ee338bf74d', '771876061034');

            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

            this.oneSignal.handleNotificationReceived().subscribe(() => {
            // do something when notification is received
            });

            this.oneSignal.handleNotificationOpened().subscribe(() => {
            // do something when a notification is opened
            });

            this.oneSignal.endInit();
        } else {
            console.log('ONE SIGNAL NO ESTÁ DISPONIBLE PARA ESCRITORIO');
        }
    }

    async getPlayerId() {
        if (this.platform.is('cordova')) {
            return await this.oneSignal.getIds();
        } else {
            return {
                userId: '33455e45-b42d-4160-adf0-119aaab76a8b'
            };
        }
    }
}
