import { Component } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth/';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from 'firebaseui-angular';
//this.angularFireAuth.authState.subscribe(this.firebaseAuthChangeListener);
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  databases;
  title = 'Break The Chain Diary';
  isloggedIn = false;

  constructor(
    private afAuth: AngularFireAuth,
    db: AngularFirestore,
    private router: Router
  ) {
    this.databases = db;
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(d => {
      console.log('rashid ngOnInit ' + JSON.stringify(d));
      if (d.uid) {
        this.isloggedIn = true;
      }
    });

    this.afAuth.authState.subscribe(d => {
      if (d.uid) {
        //this.databases.collection("users").collection.cre
        let dfReference = this.databases.collection('users').doc(d.uid);

        dfReference.ref
          .get()
          .then(function(doc) {
            if (doc.exists) {
              console.log('Document data:', doc.data());
            } else {
              // Add a new document with a generated id.
              dfReference
                .set({})
                .then(function(docRef) {
                  console.log('Document written with ID: ');
                })
                .catch(function(error) {
                  console.error('Error adding document: ');
                });
              console.log('No such document!');
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error);
          });
      }
    });
  }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);
    this.isloggedIn = true;
  }

  loggedInStateChangeEventHandler($event: any) {
    this.isloggedIn = $event;
  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }
}
