import { ExpandableHeader } from '../../components/expandable-header/expandable-header';
import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        HomePage,
        ExpandableHeader,
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
    ],
    exports: [
        HomePage,
    ]
})

export class HomePageModule { };
