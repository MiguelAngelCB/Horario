import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private db: SQLiteObject;
  private horasList: any[] = [];
  /*
  Este servicio supone que se ha copiado la bbdd
  */
  /*
   *Platform nos dice si el la plataforma a usar esta lista, entre otras cosas.
   */
  /*
  Un objeto SQLite se encarga de gestionar la bbdd
  */
  constructor(private platform: Platform, private sqlite: SQLite) {}
  executeSentence(target:any[],sqlSentence: string, searchParam: any[]) {
    let consultable = true;
    new Promise((resolve, reject) => {
      if (!this.db) {
        this.openDB()
          .then(()=>{
            console.log(this.db);
            resolve(true);
          })
          .catch(() => {
            consultable = false;
            resolve(false);
          });
      }
    }).then(() => {
      if (consultable) {
        this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          for(let i=0;data.rows.length;i++){
            let obj=data.rows.item(i);
            target.push(obj);
            console.log(obj);
          }
        })
      }
    })
    .catch((e) => {
      console.log("fallo al ejecutar sentencia "+JSON.stringify(e));
    });
  }
  
  getEstudios():Array<string>{
    let estudios:Array<string>=[];
    const sql = "Select nombre from estudios";
    this.executeSentence(estudios,sql,[]);
    return estudios;
    // this.executeSentence(this.horasList,sql,[]);
  }
  
  getCursos(estudio:string) {
    const sql = "Select grupo.nombre from grupo, estudios"+
    "where estudios.nombre like ? and estudios.idEstudios==grupo.idEstudios";
    this.executeSentence(this.horasList,sql,[estudio]);
  }

  getDias() {
    const sql = "Select nombre from diaSemana";
    this.executeSentence(this.horasList,sql,[]);
  }

  getHoras() {
    const sql = "Select descripcion as nombre from horasSemana";
    this.executeSentence(this.horasList,sql,[]);
  }

  getMateriaCompleto(abreviatura:string) {
    const sql = "SELECT completo from materia where materia.nombre like ?";
    this.executeSentence(this.horasList,sql,[abreviatura]);
  }

  getHorarioDia(grupo:string,diaSemana:string) {
    const sql = "SELECT diaSemana.nombre as Dia, horasSemana.descripcion as Hora, materia.nombre as Materia"+
    "from horasSemana, diaClase, materiahoraclase, horaClase, materia, diaSemana, grupo, estudios"+ 
    "where grupo.nombre like ? and diaSemana.nombre like ?"+
    "and diaSemana.idDiaSemana==diaClase.idDiaSemana"+
    "and diaclase.idGrupo==grupo.idGrupo"+
    "and horaclase.idDiaClase==diaclase.idDiaClase"+
    "and horaclase.idHorasSemana==horassemana.idHorasSemana"+
    "and materiahoraclase.idHoraClase==horaclase.idHoraClase"+
    "and materiahoraclase.idMateria==materia.idMateria"+

    "group by horaClase.idHoraClase";
    this.executeSentence(this.horasList,sql,[grupo,diaSemana]);
  }



  openDB() {
    return new Promise((resolve, reject) => {
      this.platform
      .ready()
      .then(() => {
        //si la plataforma esta preparada voy a abrir la bbdd ya copiada
        this.sqlite
          //si la bbdd no existe la crea y la abre y si existe la abre
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            resolve("Conexion lista");
          })
          .catch((err) => {
            console.log(err);
            reject("No se ha podido conectar con la BBDD");
          });
      })
      .catch();
    })
  }

  private getConector() {
    return {
      name: "Horario16e.db",
      location: "default",
      createFromLocation: 1,
    };
  }
}
