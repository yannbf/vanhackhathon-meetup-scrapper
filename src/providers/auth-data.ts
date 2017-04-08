import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2';
// import { Facebook, GooglePlus } from 'ionic-native';
// import { UserData } from './user-data.service';
// import { Global } from '../app/app.global';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {

    fireAuth: any;
    userProfile: any;
    currentUser: FirebaseObjectObservable<any>;
    PROVIDER_FACEBOOK = "FACEBOOK";
    PROVIDER_GOOGLE = "GOOGLE";

    constructor(public af: AngularFire, public platform: Platform) {
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('/userProfile');
        af.auth.subscribe(user => {
            if (user) {
                this.fireAuth = user.auth;
            }
        });
    }

    loginUser(email: string, password: string): any {
        return this.af.auth.login({ email: email, password: password });
    }

    anonymousLogin(): any {
        return this.af.auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous,
        });
    }

    signupUser(email, password, firstName, lastName): any {
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
            return this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
                let uid = authenticatedUser.uid;
                let userObject = {
                    uid: uid,
                    registeredDate: Date.now(),
                    name: firstName + " " + lastName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    photoURL: "",
                };
                return this.af.database.list('userProfile').update(uid, userObject).then(() => true,
                    error => {
                        throw new Error(error.message);
                    });
            }, error => {
                throw new Error(error.message);
            });
        }, error => {
            throw new Error(error.message);
        });
    }

    resetPassword(email: string): any {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser() {
        return firebase.auth().signOut();
    }
}