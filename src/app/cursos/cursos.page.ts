import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import { DatosService } from '../core/services/datos.service';
import { CopiaService } from '../core/services/copia.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  constructor(private router:Router,private copiaService:CopiaService, private datosService:DatosService) {
    this.copia();
    // this.abrir();
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

  getCursos():Array<string>{
    // let cursos:Array<string>=["ESO","BAC","FP"];
    let cursos:Array<string>=this.datosService.getEstudios();
    return cursos;
  }

  copia(){
    this.copiaService.copiarBBDD();
  }
  abrir(){
    this.datosService.openDB();
  }

}
