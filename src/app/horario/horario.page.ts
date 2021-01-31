import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../core/services/datos.service';
@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {
  public grupo:string;
  public posicionRecreo:number=3;  

  constructor(public router: Router, private rutaActivada: ActivatedRoute,private datosService:DatosService) {
    this.rutaActivada.queryParams.subscribe((params) => {
    new Promise((resolve,reject)=>{
        this.grupo = this.router.getCurrentNavigation().extras.state.grupo;
        resolve(this.grupo);
      }).then(
        (grupo)=>{
          this.rellenarDatos(grupo.toString());
        }
        ).catch();
      });
  }
  ngOnInit() {
  }
  
  async rellenarDatos(grupo:string){
    await this.datosService.rellenarHoras();
    await this.datosService.rellenarDias();
    await this.datosService.rellenarHorario(grupo);
  }

  getCompleto(asignartura):void{
      alert(asignartura.completo);
  }
  
  getHoras(){
    let horas:any[]=this.datosService.getHoras();
    return horas;
  }

  getDias(){
    let dias:any[]=this.datosService.getDias()
    return dias;
  }

  getAsignaturas(index:number){
    const numDias=5;
    const inicio:number=index*numDias;
    const final:number=inicio+numDias;
    let asignaturas:any[]=Object.create(this.datosService.getHorario());
    return asignaturas.slice(inicio,final);
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

}
