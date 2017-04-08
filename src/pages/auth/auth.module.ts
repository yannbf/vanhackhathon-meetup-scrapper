import { AuthData } from '../../providers/auth-data';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'

@NgModule({
    imports: [
        IonicModule,
        LoginModule,
        SignupModule,
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        AuthData
    ]
})

export class AuthModule { }