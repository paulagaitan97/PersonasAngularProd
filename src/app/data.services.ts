import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Persona} from './persona.model';

@Injectable()
export class DataServices{

    constructor(private httpClient:HttpClient){}
    
    //Obtener personas de la BD firebase
    cargarPersonas(){
        return this.httpClient.get('https://listado-personas-df5c2.firebaseio.com/datos.json');
    }
    
    //Guardar personas en la BD firebase
    guardarPersonas(personas: Persona[]){
       this.httpClient.put('https://listado-personas-df5c2.firebaseio.com/datos.json',personas)    
        .subscribe(
            response => console.log("resultado guardar personas : "+response),
            error => console.log("error al guardar"+error)
            );
    }
    
    modificarPersona(index:number,persona:Persona){
        let url: string;
        url = 'https://listado-personas-df5c2.firebaseio.com/datos/'+index+'.json';
        this.httpClient.put(url,persona)
            .subscribe(
                response => console.log("resultado modificar persona : "+response),
                error => console.log("error al modificar"+error)    
            );
    }

    eliminarPersona(index:number){
        let url: string;
        url = 'https://listado-personas-df5c2.firebaseio.com/datos/'+index+'.json';
        this.httpClient.delete(url)
            .subscribe(
                response => console.log("resultado eliminar persona : "+response),
                error => console.log("error al eliminar"+error)    
            );
    }
    
}