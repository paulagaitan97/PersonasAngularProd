import { Persona } from './persona.model';
import { Injectable, EventEmitter } from '@angular/core';
import { LoggingService } from './LogginService.service';
import { DataServices } from './data.services';
@Injectable()
export class PersonasService {
    /*
    Arreglo personas inicial sin BD
    personas: Persona[] = [
        new Persona("Paula", "Gaitán"),
        new Persona("James", "Rodriguez")];
    */
    personas: Persona[] = [];
    saludar=new EventEmitter<number>();
    
    constructor(private logginService:LoggingService,
                private dataService:DataServices){}
    
    //actualiza el arreglo con los registro obtenidos de la bd
    setPersonas(personasBD:Persona[]){
        this.personas=personasBD;
    }
    //obtiene las personas de la bd de firebase
    obtenerPersonas(){
        return this.dataService.cargarPersonas();
    }
    
    agregarPersona(persona: Persona) {
        this.logginService.enviarMensajeAConsola("Agregamos persona desde el servicio: "+persona.nombre);
        if(this.personas == null){
            this.personas=[];
        }
        this.personas.push(persona);
        this.dataService.guardarPersonas(this.personas);
    }
    encontrarPersona(index:number){
        let personaEncontrada: Persona=this.personas[index];
        return personaEncontrada;
    }
    modificarPersona(index:number,personaEdit:Persona){
        let personaVieja=this.personas[index];
        personaVieja.nombre=personaEdit.nombre;
        personaVieja.apellido=personaEdit.apellido;
        this.dataService.modificarPersona(index,personaEdit);
       // this.personas[index]=personaEdit;
    }

    eliminarPersona(index:number){
        this.personas.splice(index,1);
        this.dataService.eliminarPersona(index);
        //se vuelve a guardar el arreglo para regenerar los indices
        this.modificarPersonas();
    }


    modificarPersonas(){
        if(this.personas!=null){
            this.dataService.guardarPersonas(this.personas);
        }
    }
}