import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginServices } from './login.services';
import { Injectable } from '@angular/core';
@Injectable()
export class LoginGuardian implements CanActivate{
    
    constructor(private loginService:LoginServices,private router:Router){}
    
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {
       if(this.loginService.isAutenticado()){
           return true;
       }else{
           this.router.navigate(['login']);
           return false;
       }
    }

}