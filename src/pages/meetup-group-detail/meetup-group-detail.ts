import { MeetupDetailPage } from "../meetup-detail/meetup-detail";
import { MeetupData } from "../../providers/meetup-data";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-meetup-group-detail",
  templateUrl: "meetup-group-detail.html",
})
export class MeetupGroupDetailPage {
  group: any = {};
  members: any = [];
  allMembers: any = [];
  meetups: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public meetupData: MeetupData
  ) {
    this.group = navParams.data;
    this.getMembers();
    this.getMeetups();
  }

  getMembers() {
    this.meetupData.getGroupMembers(this.group).subscribe((membersData) => {
      this.members = membersData.results;
    });
  }

  membersList() {
    return this.members.filter((item, index) => index < 15);
  }

  getMeetups() {
    this.meetupData
      .getGroupEvents(this.group.urlname)
      .subscribe((meetupsData) => {
        this.meetups = meetupsData;
      });
  }

  seeMemberDetails(member) {
    this.navCtrl.push("MemberDetailPage", member.id);
  }

  seeGroupMembers() {
    this.navCtrl.push("MemberListingPage", {
      members: this.members,
      groupName: this.group.name,
    });
  }

  goToMeetup(meetup) {
    this.navCtrl.push(MeetupDetailPage, meetup);
  }
}
