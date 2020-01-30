import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, ActionSheetController  } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class MessagesController {
  loading: any;
  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private actionSheetController: ActionSheetController) { }

  async presentAlertOk(title = '', message = '', ok = 'Ok') {
    const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [ok]
      });

    await alert.present();
  }

  async presentAlertOkPromise(title = '', message = '', ok = 'Ok') {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
          header: title,
          message,
          buttons: [{
            text: ok,
            handler: () => {
              resolve(true);
            }
          }]
        });

      await alert.present();
    });
  }

  async presentAlertConfirm(header = '', message = '' , btnCancel = 'Cancel', btnOk = 'Ok'): Promise<Boolean> {
    return new Promise(
      async (resolve, reject) => {
        const alert = await this.alertCtrl.create({
          header,
          message,
          buttons: [
            {
              text: btnCancel,
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                resolve(false);
              }
            }, {
              text: btnOk,
              handler: () => {
                resolve(true);
              }
            }
          ]
        });

        await alert.present();
      }
    );
  }

  async presentAlertConfirmToExit(header = 'Alerta', message = '¿Estas seguro que deseas salir?' , btnCancel = 'No', btnOk = 'Sí'): Promise<Boolean> {
    return new Promise(
      async (resolve, reject) => {
        const alert = await this.alertCtrl.create({
          header,
          message,
          buttons: [
            {
              text: btnCancel,
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                resolve(false);
              }
            }, {
              text: btnOk,
              handler: () => {
                resolve(true);
              }
            }
          ]
        });

        await alert.present();
      }
    );
  }


  async presentLongToast(message = '') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  async presentSmallToast(message = '') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoader(message) {
    this.loading = this.loadingCtrl.create({
      message,
      cssClass: 'custom-loader-class'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });

  }

  hideLoader() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
        resolve(true);
      }, 100);
    });
  }


  async stopLoading(): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.loading.onDidDismiss();
        resolve(true);
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Flor',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertAddProduct() {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: 'Ingresar Cantidad',
        inputs: [
          {
            name: 'cantidad',
            type: 'number',
            min: 1,
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
              resolve(false);
            }
          }, {
            text: 'Añadir al carrito',
            handler: (data) => {
              console.log('Confirm Ok', data.cantidad);
              resolve(data.cantidad);
            }
          }
        ]
      });

      await alert.present();
    });
  }

}
