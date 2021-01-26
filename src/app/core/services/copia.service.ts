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
        console.log("copia la plataforma está lista");
        this.sqlDbCopy
        .copy("Horario16e.db", 0)
        .then(() => {
          console.log("copia copiada correctamente");
        })
        .catch((error) => {
          console.log("copia fallo al copiar");
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
