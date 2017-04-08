import { MeetupData } from '../../providers/meetup-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  events: any;

  constructor(public navCtrl: NavController, public meetupProvider: MeetupData) {
    this.loadEvents();
  }

  loadEvents(){
    this.meetupProvider.getMeetups().subscribe(meetupData => {
      this.events = meetupData.results;
    });
  }

}
