import { GroupsPage } from '../pages/groups/groups';
import { MemberDetailModule } from '../pages/member-detail/member-detail.module';
import { UserSettingsModule } from '../pages/user-settings/user-settings.module';
import { LoadingService } from '../providers/util/loading.service';
import { AlertService } from '../providers/util/alert.service';
import { ToastService } from '../providers/util/toast.service';
import { AuthModule } from '../pages/auth/auth.module';
import { MeetupFirebaseData } from '../providers/meetup-firebase-data';
import { MeetupDetailModule } from '../pages/meetup-detail/meetup-detail.module';
import { MeetupData } from '../providers/meetup-data';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation'

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyA2WUdcpBjBLXWnWql-5YCmhB0Rne3L1jc",
  authDomain: "meetupscrapper.firebaseapp.com",
  databaseURL: "https://meetupscrapper.firebaseio.com",
  projectId: "meetupscrapper",
  storageBucket: "",
  messagingSenderId: "170983945898"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

const appSettings = {
  tabsPlacement: 'bottom',
  backButtonText: '',
  backButtonIcon: 'ios-arrow-back',
  modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  pageTransition: 'ios'
};

class GeolocationMock extends Geolocation {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      // Always resolve to Chicago
      let resp = {
        coords: {
          latitude  : 41.8769925,
          longitude : -87.6980273
        }
      }
      resolve(resp);
    })
  }
}

@NgModule({
  declarations: [
    MyApp,
    GroupsPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    MeetupDetailModule,
    UserSettingsModule,
    MemberDetailModule,
    AuthModule,
    IonicModule.forRoot(MyApp, appSettings),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GroupsPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    MeetupData,
    MeetupFirebaseData,
    StatusBar,
    SplashScreen,
    ToastService,
    AlertService,
    LoadingService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Geolocation, useClass: GeolocationMock }
  ]
})
export class AppModule {}
