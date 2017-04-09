import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetupFirebaseData {

  userProfile: any;
  constructor(public http: Http, public af: AngularFire) {
  }
}
