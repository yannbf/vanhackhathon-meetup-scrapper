import { LoginPage } from '../pages/auth/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire } from 'angularfire2';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(public platform: Platform, public statusBar: StatusBar,
              public splashScreen: SplashScreen, public af: AngularFire) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.getInitialPageToLoad().then((page) => {
        console.log(page);
        this.rootPage = page;
        this.statusBar.styleDefault();
      });
    });
  }

  getInitialPageToLoad() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.af.auth.subscribe(user => {
        if (user) {
          resolve('TabsPage');
          unsubscribe.unsubscribe();
        } else {
          resolve('LoginPage');
          unsubscribe.unsubscribe();
        }
      });
    });
  }
}
