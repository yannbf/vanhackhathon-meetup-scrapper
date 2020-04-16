import { AlertService } from "../../providers/util/alert.service";
import { AuthData } from "../../providers/auth-data";
import { LoadingService } from "../../providers/util/loading.service";
import { MeetupFirebaseData } from "../../providers/meetup-firebase-data";
import { MeetupData } from "../../providers/meetup-data";
import { Component, ViewChild, ElementRef, Renderer } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation";
import {
  App,
  NavController,
  Platform,
  Slides,
  IonicPage,
  Content,
  Searchbar,
} from "ionic-angular";
import { Observable } from "rxjs/Observable";

declare var google: any;

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  @ViewChild("searchbar", { read: ElementRef }) searchbarRef: ElementRef;
  @ViewChild("searchbar") searchbarElement: Searchbar;
  @ViewChild("mycontent") content: Content;
  @ViewChild(Slides) categories: Slides;
  addressElement: HTMLInputElement;

  listSearch: string = "";
  events: any = [];
  groups: any = [];
  search: boolean = false;
  fabGone: boolean = false;
  location: string = "";
  meetupCount = 0;
  lat = null;
  long = null;
  view: string = "meetups";
  dataWasChanged = false;

  topics = [
    {
      name: "Ionic",
      color: "#6064FC",
    },
    {
      name: "React",
      color: "#99D6D9",
    },
    {
      name: "Angular",
      color: "#A5A3DD",
    },
    {
      name: "Vue",
      color: "#4F99F0",
    },
    {
      name: "Aurelia",
      color: "#f8ab02",
    },
    {
      name: "Java",
      color: "#ff1616",
    },
    {
      name: "C#",
      color: "#16ff89",
    },
    {
      name: "Big Data",
      color: "#b016ff",
    },
    {
      name: "Hackathon",
      color: "#FF640C",
    },
  ];

  selectedTopics = [];

  constructor(
    public app: App,
    public navCtrl: NavController,
    public meetupProvider: MeetupData,
    public firebaseData: MeetupFirebaseData,
    public authData: AuthData,
    public loadingCtrl: LoadingService,
    public alertCtrl: AlertService,
    public platform: Platform,
    public geolocation: Geolocation,
    public renderer: Renderer
  ) {
    this.geolocation.getCurrentPosition().then(
      (position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.loadData();
      },
      (error) => {
        this.lat = 41.8769925;
        this.long = -87.6980273;
        this.loadData();
      }
    );
  }

  ngOnInit() {
    window.addEventListener(
      "resize",
      () => {
        let width = this.platform.width();
        let slidesPerView = Math.floor(width / 125);
        this.categories.slidesPerView = slidesPerView;
        this.categories.update();
      },
      false
    );
  }

  addTopic(topic) {
    if (this.selectedTopics.indexOf(topic) === -1) {
      this.selectedTopics.push(topic);
      this.dataWasChanged = true;
      this.loadData();
    }
  }

  deleteTopic(topic) {
    this.selectedTopics.splice(this.selectedTopics.indexOf(topic), 1);
    this.dataWasChanged = true;
    this.loadData();
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      if (!!google) {
        this.initAutocomplete();
      } else {
        console.log("There was a weird error when trying to load google api..");
      }
    });
  }

  initAutocomplete(): void {
    this.addressElement = this.searchbarRef.nativeElement.querySelector(
      ".searchbar-input"
    );
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      this.lat = location.lat();
      this.long = location.lng();
      this.search = false;
      this.loadData();
    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, "place_changed", () => {
        const place = autocomplete.getPlace();
        this.location = place.name;
        if (!place.geometry) {
          sub.error({
            message: "Autocomplete returned place with no geometry",
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
      this.searchbarElement.setFocus();
    }
  }

  loadData() {
    if (this.view == "meetups") {
      this.loadEvents();
    } else {
      this.loadGroups();
    }
  }

  loadEvents() {
    let topics = this.selectedTopics.join(" ");
    this.meetupProvider
      .getMeetups(topics, this.lat, this.long)
      .subscribe((meetupData) => {
        this.meetupCount = meetupData.meta.total_count;
        // this.nextUrl = meetupData.meta.
        this.events = meetupData.results;
        this.dataWasChanged = false;
      });
  }

  loadGroups() {
    let topics = this.selectedTopics.join(" ");
    this.meetupProvider.getMeetupGroups(topics, this.lat, this.long).subscribe(
      (groupsData) => {
        this.meetupCount = groupsData.length;
        this.groups = groupsData;
        this.dataWasChanged = false;
      },
      (error) => {
        console.log("groups error", error);
        this.alertCtrl.createWithError(
          "There was an error fetching the meetup groups. Please try again."
        );
      }
    );
  }

  goToGroup(group) {
    this.app.getRootNav().push("MeetupGroupDetailPage", group);
  }

  goToDetail(meetup) {
    this.app.getRootNav().push("MeetupDetailPage", meetup);
  }

  // hideSearchBar(){
  // if(this.search){
  //   let opacity = 1 - (this.content.scrollTop/115);
  //   this.renderer.setElementStyle(this.searchbar.nativeElement, 'margin-top', (50 * opacity * -1) + 'px');
  //   if(opacity <= 0){
  //     opacity = 0;
  //   }
  //   // this.renderer.setElementStyle(this.searchbar.nativeElement, 'opacity', opacity.toString());
  // }
  // }
}
