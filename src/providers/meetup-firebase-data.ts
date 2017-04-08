import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetupFirebaseData {

  constructor(public http: Http, public af: AngularFire) {
    console.log('Hello MeetupFirebaseData Provider');
  }

  getSomething() {
      return this.af.database.object('test');
  }
}
