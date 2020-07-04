import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators,AbstractControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})

export class DiaryComponent {//implements OnInit {
  @Output() loggedInStateChangeEvent = new EventEmitter<boolean>();
  public visitsCollection: Observable<any[]>;
  showNewVisit = false;
  public visits;
  databases;
  visitForm : FormGroup;
  //time = {hour: 13, minute: 30};
  dateString = {};
  timeString = {};
  constructor(private afAuth: AngularFireAuth, db: AngularFirestore, fb : FormBuilder) {
    this.databases = db;
    this.createForm();
  }
  
  ngOnInit(): void {
    this.initializeDateTime();
    this.afAuth.authState.subscribe(d => {
      console.log( 'rashid ngOnInit '+ JSON.stringify(d));
      if(d.uid) {
        this.visits = this.databases.collection(`/users/${d.uid}/visits`);
        this.visitsCollection = this.visits.valueChanges()
      }
    });

  }
  
  logout() {
    this.afAuth.signOut();
    this.loggedInStateChangeEvent.emit(false);
  }
  
  addVisit() {
    this.showNewVisit = true;
    this.initializeDateTime();
  }
  
  initializeDateTime() {
    
    let currentDate = new Date();
    this.dateString = {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 ,day:currentDate.getDate()};
    this.timeString = {hour: currentDate.getHours(), minute:  currentDate.getMinutes()};
  }
  createForm() {

    console.log(this.dateString + ' '+this.timeString);
    this.visitForm = new FormGroup({
      place: new FormControl('', [Validators.required, Validators.minLength(3)]),
      purpose: new FormControl('', [Validators.minLength(3)]),
      vehicleNumber: new FormControl('', [Validators.minLength(3)]),
      visitDate: new FormControl(this.dateString, Validators.required),
      visitTime: new FormControl(this.timeString, Validators.required)
    });
  }

  onSubmit(visitForm : FormGroup) : void {


    console.log('date '+JSON.stringify( visitForm.value.visitDate)+' Time '+JSON.stringify(visitForm.value.visitTime));
    if(visitForm.status === 'VALID'){
      //Process date
      var d = new Date(visitForm.value.visitDate.year, visitForm.value.visitDate.month- 1 ,visitForm.value.visitDate.day, visitForm.value.visitTime.hour, visitForm.value.visitTime.minute,0,0);
      let timeStamp = firebase.firestore.Timestamp.fromDate(d);

      // Add a new document with a generated id.
      this.visits.add({
        place: visitForm.value.place,
        visitdateTime: timeStamp,
        purpose: visitForm.value.purpose,
        vehicleNumber: visitForm.value.vehicleNumber
      }) 
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id); 
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.onClose();
    }
  }
  
  get f(){
    return this.visitForm.controls;
  }
  
  onReset() {
    this.visitForm.reset({place: '', purpose: '', visitDate: '', visitTime :'', vehicleNumber: ''});
    this.initializeDateTime();
  }
  
  onClose() {
    this.onReset();
    this.showNewVisit = false;
  }
}
