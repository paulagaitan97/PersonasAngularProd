import { Component, OnInit } from '@angular/core';
import *  as firebase from 'firebase/app';
import { LoginServices } from './login/login.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Listado de personas';


  constructor(private loginServices:LoginServices) { }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyA5McDQAFzeoCFhoEXsLkB4PmUOnDaue-M",
      authDomain: "listado-personas-df5c2.firebaseapp.com",
    })
  }

  isAutenticado(){
    return this.loginServices.isAutenticado();
  }
  salir(){
     this.loginServices.logout();
  }
  
}
