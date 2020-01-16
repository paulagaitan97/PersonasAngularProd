import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Persona} from './persona.model';
import { LoggingService } from './LogginService.service';
import { LoginServices } from './login/login.services';

@Injectable()
export class DataServices{

    constructor(private httpClient:HttpClient,
                private loginService:LoginServices){}
    
    //Obtener personas de la BD firebase
    cargarPersonas(){
        const token=this.loginService.getIdToken();
        return this.httpClient.get('https://listado-personas-df5c2.firebaseio.com/datos.json?auth='+token);
    }
    
    //Guardar personas en la BD firebase
    guardarPersonas(personas: Persona[]){
        const token=this.loginService.getIdToken();
       this.httpClient.put('https://listado-personas-df5c2.firebaseio.com/datos.json?auth='+token,personas)    
        .subscribe(
            response => console.log("resultado guardar personas : "+response),
            error => console.log("error al guardar"+error)
            );
    }
    
    modificarPersona(index:number,persona:Persona){
        const token=this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-personas-df5c2.firebaseio.com/datos/'+index+'.json?auth='+token;
        this.httpClient.put(url,persona)
            .subscribe(
                response => console.log("resultado modificar persona : "+response),
                error => console.log("error al modificar"+error)    
            );
    }

    eliminarPersona(index:number){
        const token=this.loginService.getIdToken();
        let url: string;
        url = 'https://listado-personas-df5c2.firebaseio.com/datos/'+index+'.json?auth='+token;
        this.httpClient.delete(url)
            .subscribe(
                response => console.log("resultado eliminar persona : "+response),
                error => console.log("error al eliminar"+error)    
            );
    }
    
}