import { MeetupData } from '../../providers/meetup-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-meetup-detail',
  templateUrl: 'meetup-detail.html',
})
export class MeetupDetail {

  meetup   : any;
  hosts    : any = [];
  comments : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public meetupData: MeetupData) {
    this.meetup = navParams.data;
    this.getHosts();
    this.getComments();
  }

  getHosts(){
    this.meetupData.getMeetupHosts(this.meetup.group.urlname, this.meetup.id).subscribe(hostsData => {
      this.hosts = hostsData;
    });
  }

  getComments(){
    this.meetupData.getMeetupComments(this.meetup.group.urlname, this.meetup.id).subscribe(commentsData => {
      this.comments = commentsData;
    });
  }

}
