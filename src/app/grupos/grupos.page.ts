import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras} from '@angular/router';
import { DatosService } from '../core/services/datos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  curso:string;

  constructor(public router: Router, private rutaActivada: ActivatedRoute,private datosService:DatosService) {
      this.rutaActivada.queryParams.subscribe((params) => {
        new Promise((resolve,reject)=>{
          this.curso = this.router.getCurrentNavigation().extras.state.curso;
          resolve(true);
        }).then(
          ()=>{
            this.datosService.rellenarGrupos(this.curso);
          }
        ).catch();
      });
  }
  
  ngOnInit() {
  }
  
  async verHorario(grupo:string){
    let extrasNavegacion: NavigationExtras = {
      state: {
        grupo: grupo,
      },
    };
    await this.router.navigate(["horario"],extrasNavegacion);
  }

  getGrupos(){
    let grupos:any[]=this.datosService.getGrupos();
    return grupos;
  }
}
