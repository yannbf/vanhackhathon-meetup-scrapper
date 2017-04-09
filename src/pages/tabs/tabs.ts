import { SplashScreen } from '@ionic-native/splash-screen';
import { UserSettingsPage } from '../user-settings/user-settings';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = UserSettingsPage;

  constructor(public splashscreen: SplashScreen) {
      splashscreen.hide();
  }
}
