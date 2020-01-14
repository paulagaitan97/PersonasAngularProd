import { Component, OnInit } from '@angular/core';
import { Persona } from '../../persona.model';
import { LoggingService } from '../../LogginService.service';
import { PersonasService } from '../../personas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  //@Output() personaCreada=new EventEmitter<Persona>();
  nombreInput:string;
  apellidoInput:string;
  index:number;
  modoEdicion:number;
  constructor(private logginService:LoggingService,
    private personasService:PersonasService,
    private router:Router,
    private route: ActivatedRoute) {
      this.personasService.saludar.subscribe(
        (indice:number)=> alert("el indice es: "+indice)
      );
     }

  ngOnInit() {
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion= +this.route.snapshot.queryParams['modoEdicion'];
    
    if(this.modoEdicion!=null && this.modoEdicion ===1){
     let persona:Persona= this.personasService.encontrarPersona(this.index);
     this.nombreInput=persona.nombre;
     this.apellidoInput=persona.apellido;
    }
  }
  onGuardarPersona() {
    let personaNueva = new Persona(this.nombreInput, this.apellidoInput);
    if (this.modoEdicion != null && this.modoEdicion === 1) {
      this.personasService.modificarPersona(this.index, personaNueva);
    } else {
      // this.logginService.enviarMensajeAConsola("enviamos persona con nombre : "+personaNueva.nombre+" Apellido: "+personaNueva.apellido);
      //this.personaCreada.emit(personaNueva);
      this.personasService.agregarPersona(personaNueva);

    }
    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index!=null){
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }

}
