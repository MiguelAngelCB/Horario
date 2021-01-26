import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  private grupo:string;
  
  constructor(public router: Router, private rutaActivada: ActivatedRoute) {
    this.rutaActivada.queryParams.subscribe((params) => {
      this.grupo = this.router.getCurrentNavigation().extras.state.grupo;
    });
  }
  ngOnInit() {
  }

  
  getCompleto(abreviatura:string):void{
    if (abreviatura!="Recreo") {
      let nombreCompleto:string="Completo";
      alert(nombreCompleto);
    }
  }
  
  getHoras():Array<string>{
    let horas:Array<string>=["8:15","9:05","10:00","10:55","11:25","13:15"];
    this.addRecreo(horas);
    return horas;
  }

  getDias():Array<string>{
    return ["Lunes","Martes","Miercoles","Jueves","Viernes"];
  }

  getAsignaturas(dia:string):Array<string>{
    let asignaturas:Array<string>=["mates","biologia","lengua","lengua","plastica","prueba"];
    this.addRecreo(asignaturas);
    return asignaturas;
  }

  getSiguienteHora(hora:string):string{
    let duracionClase:number=55;
    let horas:number=parseInt(hora.split(":")[0]);
    let minutos:number=parseInt(hora.split(":")[1]);
    let siguienteHora:string="";
    minutos+=duracionClase;
    if (minutos>=60) {
      horas+=1;
      minutos-=60;
    }
    siguienteHora+=horas.toString()+":";
    if (minutos>=0 && minutos <= 9) {
      siguienteHora+="0";
    }
    siguienteHora+=minutos.toString();
    return siguienteHora;
  }

  addRecreo(array:Array<string>){
    let recreoPosition=3;
    array.splice(recreoPosition, 0, "Recreo");
  }

}
