import { AlertService } from '../../providers/util/alert.service';
import { LoginPage } from '../auth/login/login';
import { AuthData } from '../../providers/auth-data';
import { LoadingService } from '../../providers/util/loading.service';
import { MeetupFirebaseData } from '../../providers/meetup-firebase-data';
import { MeetupDetail } from '../meetup-detail/meetup-detail';
import { MeetupData } from '../../providers/meetup-data';
import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: any = [];

  constructor(public app: App, public navCtrl: NavController,
              public meetupProvider: MeetupData, public firebaseData: MeetupFirebaseData,
              public authData: AuthData, public loadingCtrl: LoadingService,
              public alertCtrl: AlertService) {
    this.loadEvents();
  }

  loadEvents(){
    this.meetupProvider.getMeetups('chicago').subscribe(meetupData => {
      this.events = meetupData.results;
    });
  }

  goToDetail(meetup){
    this.app.getRootNav().push(MeetupDetail, meetup);
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
