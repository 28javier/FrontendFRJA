import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Producto } from '../models/producto.model';




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


  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre1, user.nombre2, user.apellido1,
        user.apellido2, user.email, '', user.role, user.especialidad,
        user._id, user.img));
  }

  private transformarProductos(resultado: any[]): Producto[] {
    return resultado;
  }

  buscar(tipo: 'usuarios'|'productos'|'pacientes', termino: string) {
    // todo/coleccion/usuarios/u
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) =>
         {
         switch (tipo) {
           case 'usuarios':
             return  this.transformarUsuarios(resp.resultados);

             case 'productos':
             return  this.transformarProductos(resp.resultados);

           default:
             return [];
         }
        }
        //  resp.resultado)
      ));
  }
}
