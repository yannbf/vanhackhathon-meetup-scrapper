import { LoginPage } from '../auth/login/login';
import { AuthData } from '../../providers/auth-data';
import { AlertService } from '../../providers/util/alert.service';
import { Component } from '@angular/core';
import { App, IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
})
export class UserSettingsPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertService,
    public authData: AuthData, public app: App) {
  }

  logout() {
    this.alertCtrl.createWithCallback("Are you sure?",
      "This will log you out of this application.", true).then((yes) => {
      if (yes) {
        this.authData.logoutUser().then((result) => {
          this.app.getRootNav().setRoot(LoginPage);
        }, (error) => {
        });
      }
    });
  }
}
