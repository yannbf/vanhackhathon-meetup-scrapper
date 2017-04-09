import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberDetailPage } from './member-detail';

@NgModule({
  declarations: [
    MemberDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberDetailPage),
  ],
  exports: [
    MemberDetailPage
  ]
})
export class MemberDetailModule {}
