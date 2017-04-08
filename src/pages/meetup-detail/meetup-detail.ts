import { MeetupData } from '../../providers/meetup-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-meetup-detail',
  templateUrl: 'meetup-detail.html',
})
export class MeetupDetail {

  meetup: any;
  hosts : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    meetupData: MeetupData) {
    this.meetup = navParams.data;
    meetupData.getMeetupHosts(this.meetup.group.urlname, this.meetup.id).subscribe(hostsData => {
      this.hosts = hostsData;
    });
  }

}
