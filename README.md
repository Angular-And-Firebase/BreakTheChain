# BreakTheChainDiary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Steps to setup by Rashid

ng new break-the-chain-diary --minimal -g --skip-install -S
angular projectname   break-the-chain-diary
create firebase project BTCD	
Add one app in project setting->General tab ,
app  name within project BreakTheChainApp
copy paste config to environment.ts

npm i -g @angular/cli@latest //if not already installed

/*** before hosting build angular project
ng build --prod
//*******	hosting commands
firebase init hosting
firebase deploy --only hosting


//*****To checke local deployment
firebase serve
firebase serve --only hosting

firebase serve --only functions,hosting // uses a flag
firebase serve --only functions

//******depoly with comment
firebase deploy -m "Deploying the best new feature ever."


//*******authentication ui
npm install firebaseui --save
npm install firebaseui-angular --save

npm install firebase firebaseui @angular/fire firebaseui-angular --save


//***********using firebaseui
https://www.youtube.com/watch?v=wC1eZNE5cMc
https://github.com/angular/angularfire
https://github.com/RaphaelJenni/FirebaseUI-Angular


//********** Refined steps
ng add @angular/fire
npm install firebaseui-angular --save
npm install firebase firebaseui @angular/fire firebaseui-angular --save
ng build --prod
npm i firebase angularfire2   // for firestore
firebase deploy --only hosting
ng add @ng-bootstrap/ng-bootstrap  // not working so use ng add @ng-bootstrap/schematics
npm install ng-bootstrap-form-validation --save

/** for  datepicker
 npm install --save @ng-bootstrap/ng-bootstrap
 ng add @angular/localize
