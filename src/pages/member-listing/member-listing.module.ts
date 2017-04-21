import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberListingPage } from './member-listing';

@NgModule({
  declarations: [
    MemberListingPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberListingPage),
  ],
  exports: [
    MemberListingPage
  ]
})
export class MemberListingModule {}
