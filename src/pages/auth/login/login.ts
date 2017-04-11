import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../../tabs/tabs';
import { AuthData } from '../../../providers/auth-data';
import { LoadingService } from '../../../providers/util/loading.service';
import { AlertService } from '../../../providers/util/alert.service';
import { ToastService } from '../../../providers/util/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder,
    public toastCtrl: ToastService, public alertCtrl: AlertService, public loadingCtrl: LoadingService,
    public authData: AuthData, public splashscreen: SplashScreen) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });
    splashscreen.hide();
    alertCtrl.create("Meetapp",  `
        <p> Hey! Thanks for trying meetapp out. If you don't want to create an account, go on and login using:</p>
        <ul>
          <li>Username: a@a.com</li>
          <li>Password: asdasd</li>
        </ul>
        <p style="float:right">Enjoy!</p>
      `);
  }

  login() {
    let { email, password } = this.loginForm.controls;
    if (!this.loginForm.valid) {
      let errorMessage = "";

      if (!email.valid) {
        errorMessage = "Oops! Invalid e-mail.";
      } else if (!password.valid) {
        errorMessage = "Passwords must contain 6 to 20 characters.";
      }

      this.toastCtrl.create(errorMessage);
    } else {
      this.loadingCtrl.present();
      let { email, password } = this.loginForm.value;
      this.authData.loginUser(email, password).then(() => {
        this.loadingCtrl.dismiss().then(() => {
          this.goToHome();
        });
      }, (error) => {
        this.loadingCtrl.dismiss().then(() => {
          this.alertCtrl.createWithError(error.message);
        });
      });
    }
  }

  facebookLogin() {
    this.loadingCtrl.present();
    this.authData.facebookLogin().then(response => {
      if (response == true) {
        this.loadingCtrl.dismiss().then(() => {
          this.goToHome();
        });
      } else {
        this.loadingCtrl.dismiss().then(() => {
          if (response.message) {
            this.alertCtrl.createWithError(response.message);
          }
        });
      }
    }, error => {
      this.loadingCtrl.dismiss().then(() => {
        this.alertCtrl.createWithError(JSON.stringify(error));
      });
    });
  }

  goToHome() {
    this.navCtrl.setRoot(TabsPage);
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

}
