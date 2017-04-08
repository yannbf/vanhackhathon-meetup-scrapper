import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetupData {

  url = "https://api.meetup.com/2/open_events?and_text=False&country=us&offset=0&city=chicago&format=json&limited_events=False&state=il&photo-host=public&page=20&radius=500&category=20&desc=False&status=upcoming&sig_id=191315903&sig=bd2a454acd81e8701f1045734a0522d2965861ea";

  constructor(public http: Http) { }

  getMeetups(): any{
    return this.http.get("https://crossorigin.me/" + this.url).map(res => res.json());
  }

}
