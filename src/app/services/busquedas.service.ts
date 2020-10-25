import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';




const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }


  get token(){
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
     headers: {
       'x-token': this.token
     }
    };
  }


  private transformarUsuarios(resultado: any[]): Usuario[] {
    return resultado.map(
                  user => new Usuario(user.nombre1, user.nombre2, user.apellido1,
                    user.apellido2, user.email, '', user.role, user.especialidad,
                    user._id, user.img));
  }

  busqueda(tipo: 'usuarios'| 'productos' | 'pacientes', termino: string) {
    // todo/coleccion/usuarios/u
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) =>
         {
         switch (tipo) {
           case 'usuarios':
             return  this. transformarUsuarios(resp.resultado);
           default:
             return [];
         }
        }
        //  resp.resultado)
      ));
  }
}
