import { AlertService } from '../../providers/util/alert.service';
import { LoginPage } from '../auth/login/login';
import { AuthData } from '../../providers/auth-data';
import { LoadingService } from '../../providers/util/loading.service';
import { MeetupFirebaseData } from '../../providers/meetup-firebase-data';
import { MeetupDetail } from '../meetup-detail/meetup-detail';
import { MeetupData } from '../../providers/meetup-data';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { App, NavController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement;

  listSearch: string = '';
  events: any        = [];
  search: boolean    = false;
  fabGone: boolean   = false;
  location: string   = "";
  meetupCount        = 0;
  lat                = null;
  long               = null;

  topics = [{
    name: 'Hackathon',
    color: '#FF640C'
  },{
    name: 'Ionic',
    color: '#6064FC'
  }, {
    name: 'React',
    color: '#99D6D9'
  }, {
    name: 'Angular',
    color: '#A5A3DD'
  },{
    name: 'Vue',
    color: '#4F99F0'
  }, {
    name: 'Aurelia',
    color: '#f8ab02'
  }];

  selectedTopics = [];

  constructor(public app: App, public navCtrl: NavController,
              public meetupProvider: MeetupData, public firebaseData: MeetupFirebaseData,
              public authData: AuthData, public loadingCtrl: LoadingService,
              public alertCtrl: AlertService, public platform: Platform,
              public geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then(position => {
      this.lat  = position.coords.latitude;
      this.long = position.coords.longitude;
      this.loadEvents();
    });
  }

  addTopic(topic){
    if(this.selectedTopics.indexOf(topic) === -1){
      this.selectedTopics.push(topic);
      this.loadEvents();
    }
  }

  deleteTopic(topic) {
    this.selectedTopics.splice(this.selectedTopics.indexOf(topic),1);
    this.loadEvents();
  }

  ngAfterViewInit(){
    this.platform.ready().then(() => {
      if (!!google) {
        this.initAutocomplete();
      } else {
        console.log('There was a weird error when trying to load google api..');
      }
    });
  }

  initAutocomplete(): void {
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      this.lat    = location.lat();
      this.long   = location.lng();
      this.search = false;
      this.loadEvents();
    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.location = place.name  ;
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
        }
      });
    });
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  loadEvents(){
    this.loadingCtrl.present();
    let topics = this.selectedTopics.join(' ');
    this.meetupProvider.getMeetups(topics, this.lat, this.long).subscribe(meetupData => {
      this.loadingCtrl.dismiss().then(() => {
        this.meetupCount = meetupData.meta.total_count;
        // this.nextUrl = meetupData.meta.
        this.events = meetupData.results;
      });
    });
  }

  goToDetail(meetup){
    this.app.getRootNav().push(MeetupDetail, meetup);
  }

  logout() {
    this.alertCtrl.createWithCallback("Are you sure?",
      "This will log you out of this application.", true).then((yes) => {
      if (yes) {
        this.authData.logoutUser().then((result) => {
          this.app.getRootNav().setRoot(LoginPage);
        }, (error) => {
        });
      }
    });
  }
}
