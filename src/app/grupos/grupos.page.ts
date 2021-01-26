import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {
  curso:string;

  constructor(public router: Router, private rutaActivada: ActivatedRoute) {
    this.rutaActivada.queryParams.subscribe((params) => {
      this.curso = this.router.getCurrentNavigation().extras.state.curso;
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

  getGrupos():Array<string>{
    let grupos:Array<string>=["e1c","ac2","czx2"];
    return grupos;
  }
}
