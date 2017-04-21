import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-member-listing',
  templateUrl: 'member-listing.html',
})
export class MemberListingPage {

  members = [];
  membersRef = [];
  groupName = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.members = navParams.get('members');
    this.membersRef = navParams.get('members');
    this.groupName = navParams.get('groupName');
  }

  getMember(ev: any) {
    let val = ev.srcElement.value;
    if (val && val.trim() !== '') {
      this.members = this.membersRef.filter(function(member) {
        return member.name.toLowerCase().includes(val.toLowerCase());
      });
    } else {
      this.members = this.membersRef;
    }
  }

  seeMemberDetails(member) {
    this.navCtrl.push('MemberDetailPage', member.id);
  }

}
