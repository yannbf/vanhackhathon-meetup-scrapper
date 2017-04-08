import { TabsPage } from '../../tabs/tabs';
import { AuthData } from '../../../providers/auth-data';
import { AlertService } from '../../../providers/util/alert.service';
import { LoadingService } from '../../../providers/util/loading.service';
import { ToastService } from '../../../providers/util/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      formBuilder: FormBuilder, public toastCtrl: ToastService,
      public loadingCtrl: LoadingService, public alertCtrl: AlertService,
      public authData: AuthData) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  signup() {
    let { email, password, passwordConfirm, firstName, lastName } = this.signupForm.controls;
    let passwordMismatch = passwordConfirm.value !== password.value;
    debugger;
    if (!this.signupForm.valid || passwordMismatch) {
      let errorMessage = "";

      if(passwordMismatch) {
        errorMessage = "Password and confirmation must be equal.";
      }

      if (!firstName.valid) {
        errorMessage = "First name is required.";
      } else if (!lastName.valid) {
        errorMessage = "Last name is required.";
      } else if (!email.valid) {
        errorMessage = "Oops! Invalid e-mail.";
      } else if (!password.valid) {
        errorMessage = "Passwords must contain 6 to 20 characters.";
      }

      this.toastCtrl.create(errorMessage);
    } else {
      debugger;
      this.loadingCtrl.present();
      let { email, password, firstName, lastName } = this.signupForm.value;
      this.authData.signupUser(email, password, firstName, lastName).then(() => {
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

}
