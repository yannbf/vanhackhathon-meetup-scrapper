import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-meetup-detail',
  templateUrl: 'meetup-detail.html',
})
export class MeetupDetail {

  meetup: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.meetup = navParams.data;
  }

}
