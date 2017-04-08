import { MeetupData } from '../../providers/meetup-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  meetupData: any;

  constructor(public navCtrl: NavController, public meetupProvider: MeetupData) {
    this.meetupProvider.getMeetups().subscribe(meetups => {
      this.meetupData = meetups.results;
    });
  }

}
