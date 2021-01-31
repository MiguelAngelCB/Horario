import { SqliteDbCopy } from "@ionic-native/sqlite-db-copy/ngx";
import { Platform } from "@ionic/angular";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopiaService {

  constructor(private sqlDbCopy: SqliteDbCopy, private platform: Platform) {}

  copiarBBDD() {
    return new Promise((resolve,reject)=>{
      this.platform.ready()
      .then(()=>{
        this.sqlDbCopy
        .copy("Horario16.db", 0)
        .then(() => {
          console.log("copia lista");
        })
        .catch((error) => {
          console.log("copia" + JSON.stringify(error));
        });
    }).catch(
      ()=>{
        console.log("La plataforma no esta preparada para copiar");
      }
    );
    });
  }
}
