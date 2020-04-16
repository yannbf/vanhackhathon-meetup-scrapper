import { LoadingService } from "../../providers/util/loading.service";
import { MeetupData } from "../../providers/meetup-data";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-member-detail",
  templateUrl: "member-detail.html",
})
export class MemberDetailPage {
  member: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public meetupProvider: MeetupData,
    public loadingCtrl: LoadingService
  ) {
    let memberId = navParams.data;
    this.loadMemberInfo(memberId);
  }

  loadMemberInfo(memberId) {
    // this.loadingCtrl.present();
    this.meetupProvider.getMemberDetails(memberId).subscribe((memberData) => {
      this.member = memberData;
      // this.member.social = [];

      // Loops through social network info
      // for (var key in memberData.other_services) {
      //   if (memberData.other_services.hasOwnProperty(key)) {
      //     let socialInfo = {
      //       provider: key,
      //       profile: memberData.other_services[key].identifier
      //     }
      //     this.member.social.push(socialInfo);
      //   }
      // }
      // this.loadingCtrl.dismiss();
    });
  }
}
