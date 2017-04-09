import { AlertService } from '../../providers/util/alert.service';
import { LoginPage } from '../auth/login/login';
import { AuthData } from '../../providers/auth-data';
import { LoadingService } from '../../providers/util/loading.service';
import { MeetupFirebaseData } from '../../providers/meetup-firebase-data';
import { MeetupDetail } from '../meetup-detail/meetup-detail';
import { MeetupData } from '../../providers/meetup-data';
import { Component, ViewChild, ElementRef } from '@angular/core';
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

  constructor(public app: App, public navCtrl: NavController,
              public meetupProvider: MeetupData, public firebaseData: MeetupFirebaseData,
              public authData: AuthData, public loadingCtrl: LoadingService,
              public alertCtrl: AlertService, public platform: Platform) {
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
      let lat  = location.lat();
      let long = location.lng();
      this.loadingCtrl.present();
      this.meetupProvider.getMeetupsByLatLong(lat, long).subscribe((meetupData) =>{
        this.loadingCtrl.dismiss().then( () => {
          this.events     = meetupData.results;
          this.listSearch = '';
          this.search     = false;
        });
      });
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
    this.meetupProvider.getMeetups('chicago').subscribe(meetupData => {
      this.events = meetupData.results;
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
