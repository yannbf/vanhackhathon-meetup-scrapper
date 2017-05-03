import { GroupsPage } from './groups';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        GroupsPage,
    ],
    imports: [
        IonicPageModule.forChild(GroupsPage),
    ],
    exports: [
        GroupsPage
    ]
})

export class GroupsPageModule { };
