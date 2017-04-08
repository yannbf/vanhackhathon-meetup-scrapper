import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetupDetail } from './meetup-detail';

@NgModule({
  declarations: [
    MeetupDetail,
  ],
  imports: [
    IonicPageModule.forChild(MeetupDetail),
  ],
  exports: [
    MeetupDetail
  ]
})
export class MeetupDetailModule {}
