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
    public authData: AuthData) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });
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
          this.navCtrl.setRoot(TabsPage);
        });
      }, (error) => {
        this.loadingCtrl.dismiss().then(() => {
          this.alertCtrl.createWithError(error.message);
        });
      });
    }
  }

  facebookLogin(){
    this.toastCtrl.create("Oops, not implemented yet!");
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

}
