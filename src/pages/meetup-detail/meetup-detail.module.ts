import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetupDetailPage } from './meetup-detail';

@NgModule({
  declarations: [
    MeetupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetupDetailPage),
  ],
  exports: [
    MeetupDetailPage
  ]
})
export class MeetupDetailModule {}
