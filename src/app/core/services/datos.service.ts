import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { CopiaService } from './copia.service';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private db: SQLiteObject;
  private horasList: any[];
  private diasList: any[];
  private cursosList: any[];
  private gruposList: any[];
  private horarioList: any[];
  /*
  Este servicio supone que se ha copiado la bbdd
  */
  /*
   *Platform nos dice si el la plataforma a usar esta lista, entre otras cosas.
   */
  /*
  Un objeto SQLite se encarga de gestionar la bbdd
  */
  constructor(private platform: Platform, private sqlite: SQLite,private copia:CopiaService) {
    this.copia.copiarBBDD();
    // this.rellenarCursos();
    // this.rellenarHoras();
    // this.rellenarDias();
  }
  executeSentence(target:any[],sqlSentence: string, searchParam: any[]) {
    let consultable = true;
    return new Promise((resolve, reject) => {
      if (!this.db) {
        this.openDB()
          .then(()=>{
            resolve(true);
          })
          .catch(() => {
            consultable = false;
            reject(false);
          });
      }else{
        resolve(true);
      }
    }).then(() => {
      if (consultable) {
        this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          for(let i=0;i<data.rows.length;i++){
            let obj=data.rows.item(i);
            target.push(obj);
          }
          });
        }
    })
    .catch((e) => {
      console.log("fallo al ejecutar sentencia "+JSON.stringify(e));
    });
  }

  
  openDB() {
    return new Promise((resolve, reject) => {
      this.platform
      .ready()
      .then(() => {
        this.sqlite
        .create(this.getConector())
        .then((db: SQLiteObject) => {
          this.db = db;
          resolve("Conexion lista");
        })
        .catch((err) => {
            reject("No se ha podido conectar con la BBDD");
          });
        })
        .catch();
      })
    }
    
  private getConector() {
      return {
        name: "Horario16.db",
        location: "default",
        createFromLocation: 1,
      };
  }
  
  rellenarCursos() {
    const sql = "Select nombre from estudios";
    this.cursosList=[];
    return this.executeSentence(this.cursosList,sql,[]);
  }

  rellenarHoras() {
    const sql = "Select descripcion as nombre from horasSemana";
    this.horasList=[];
    return this.executeSentence(this.horasList,sql,[]);
  }

  rellenarGrupos(curso:string) {
    this.gruposList=[];
    const sql = "SELECT grupo.nombre FROM grupo INNER JOIN estudios ON grupo.idEstudios = estudios.idEstudios  WHERE estudios.nombre LIKE ?";
    return this.executeSentence(this.gruposList,sql,[curso]);
  }
  
  rellenarDias() {
    this.diasList=[];
    const sql = "Select nombre from diaSemana";
    return this.executeSentence(this.diasList,sql,[]);
  }
  
  rellenarHorario(grupo:string) {
      this.horarioList=[];
        const sql = 'Select materia.nombre , materia.completo ' +
      'from horasSemana, diaClase, materiahoraclase, horaClase, materia, diaSemana, grupo, estudios where ' +
      'grupo.nombre like "' + grupo + '" ' +
      'and diaSemana.idDiaSemana==diaClase.idDiaSemana ' +
      'and diaclase.idGrupo==grupo.idGrupo ' +
      'and horaclase.idDiaClase==diaclase.idDiaClase ' +
      'and horaclase.idHorasSemana==horassemana.idHorasSemana ' +
      'and materiahoraclase.idHoraClase==horaclase.idHoraClase ' +
      'and materiahoraclase.idMateria==materia.idMateria ' +
      'group by horaClase.idHorasSemana, horaClase.idDiaClase, horaClase.idHoraClase ORDER BY horasSemana.idHorasSemana';
      return this.executeSentence(this.horarioList,sql,[]);
  }

  getGrupos(){
    return this.gruposList;
  }

  getCursos(){
    return this.cursosList;
  }

  getHoras(){
    return this.horasList;
  }

  getDias(){
    return this.diasList;
  }

  getHorario(){
    return this.horarioList;
  }

}
