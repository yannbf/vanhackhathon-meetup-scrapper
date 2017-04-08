import { MeetupData } from '../../providers/meetup-data';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  groups: any = [];
  constructor(public navCtrl: NavController, public meetupProvider: MeetupData) {
    this.loadGroups('ionic');
  }

  loadGroups(topic) {
    this.meetupProvider.getMeetupGroups(topic).subscribe(groupsData => {
      this.groups = groupsData;
    });
  }

}
