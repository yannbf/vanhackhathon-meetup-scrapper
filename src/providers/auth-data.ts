import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';

@Injectable()
export class AuthData {

    fireAuth: any;
    userProfile: any;
    currentUser: FirebaseObjectObservable<any>;
    PROVIDER_FACEBOOK = "FACEBOOK";

    constructor(public af: AngularFire, public platform: Platform, public fb: Facebook) {
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('/userProfile');
        af.auth.subscribe(user => {
            if (user) {
                this.fireAuth = user.auth;
            }
        });
    }

    getCurrentUser() {
        return this.fireAuth;
    }

    getUserByUid(uid) {
        return new Promise((resolve, reject) => {
            var userRef = this.userProfile.child(uid);
            userRef.once("value", function (snap) {
                var user = snap.val();
                resolve(user);
                }, function (error) {
                reject(error);
            });
        });
    }

    loginUser(email: string, password: string): any {
        return this.af.auth.login({ email: email, password: password });
    }

    facebookLogin() {
        var scope = ['email', 'public_profile'];
        if (this.platform.is('cordova')) {
            // If user is in a device, uses facebook plugin
            return this.fb.login(scope).then((response:FacebookLoginResponse) => {
                let creds = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
                return firebase.auth().signInWithCredential(creds).then(facebookData => {
                    return this.socialLoginSuccess(facebookData, this.PROVIDER_FACEBOOK);
                }, error => {
                    return {
                        success: false,
                        message: error.message
                    };
                }).catch((error) => {
                    console.info("facebook error", error);
                    return error;
                });
            }, error => {
                if (error.errorCode == "4201") {
                    return false;
                }

                return error;
            });
        } else {
            // If user is NOT in a device, falls back to browser facebook auth
            return this.af.auth.login({
                provider: AuthProviders.Facebook,
                method: AuthMethods.Popup,
                scope: scope
            }).then((facebookData) => {
                return this.socialLoginSuccess(facebookData.auth, this.PROVIDER_FACEBOOK);
            }, error => {
                return error;
            }).catch((error) => {
                return error;
            });
        }
    }

    socialLoginSuccess(firebaseData, provider) {
        return this.getUserByUid(firebaseData.uid).then(user => {
            let uid = firebaseData.uid;
            if (!user) {
                let { displayName, email, photoURL } = firebaseData.providerData[0];

                let userObject = {
                    uid: uid,
                    registeredDate: Date.now(),
                    name: displayName,
                    firstName: displayName.match(/^(\S+)\s(.*)/).slice(1)[0],
                    lastName: displayName.match(/^(\S+)\s(.*)/).slice(1)[1],
                    email: email,
                    socialPhotoURL: photoURL,
                };

                return this.af.database.list('userProfile').update(uid, userObject).then(() => true);
            } else {
                let userObject = { facebookVerified: true };
                return this.af.database.list('userProfile').update(uid, userObject).then(() => true);
            }
        }, error => {
            console.log('social login firebase error', error);
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

                newUser.updateProfile({
                    displayName: firstName + " " + lastName
                });

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