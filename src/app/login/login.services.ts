import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
@Injectable()
export class LoginServices{
    token : string; 
    constructor(private router: Router){}

    login(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email,password).
        then(
            response => {
                firebase.auth().currentUser.getIdToken().then(
                    token => {
                        this.token = token;
                        this.router.navigate(['/']);
                    }
                )
            }
        )
      
    }


    getIdToken(){
        return this.token;
    }

    isAutenticado(){
        return this.token!=null;
    }

    logout(){
        firebase.auth().signOut().then(()=>{
            this.token=null;
            this.router.navigate(['login']);
        }).catch(error => console.log("error logout:"+error));
    }
}