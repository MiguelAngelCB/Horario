import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { DatosService } from '../core/services/datos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  constructor(private router:Router, private datosService:DatosService) {
    this.datosService.rellenarCursos();
  }

  ngOnInit() {
  }

  async verGrupos(curso:string){
    let extrasNavegacion: NavigationExtras = {
      state: {
        curso: curso,
      },
    };
    await this.router.navigate(["grupos"],extrasNavegacion);
  }

  getCursos(){
    let cursos:any[]=this.datosService.getCursos();
    return cursos;
  }

}
