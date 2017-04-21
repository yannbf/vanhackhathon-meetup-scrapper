import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetupGroupDetailPage } from './meetup-group-detail';

@NgModule({
  declarations: [
    MeetupGroupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetupGroupDetailPage),
  ],
  exports: [
    MeetupGroupDetailPage
  ]
})
export class MeetupGroupDetailModule {}
