import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(
    private personasService: PersonasService,
    private router:Router) { }

  ngOnInit(): void {
    //obtener personas desde arreglo
    //this.personas=this.personasService.personas;
    
    //Obtener personas desde firebase
    this.personasService.obtenerPersonas()
    .subscribe(
      (personasBD:Persona[])=>{
        this.personas=personasBD;
        this.personasService.setPersonas(this.personas);
      }
    );
  }

  agregar(){
    this.router.navigate(['personas/agregar']);
  }

}
