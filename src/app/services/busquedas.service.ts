import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Producto } from '../models/producto.model';
import { Paciente } from '../models/paciente.model';
import { Categoria } from '../models/categoria.model';
import { Especialidad } from '../models/especialidad.model';





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

  // nombre1: string, nombre2: string, apellido1: string, apellido2: string, email: string,
  //  cedula: string, sexo?: string, fechaNacimiento?: string, estadoCivil?: string, tipoDeSangre?: string, 
  //  direccion1?: string, direccion2?: string, celular1?:
  //  string, celular2?: string, password?: string, role?: string, especialidad?: _EspecialidadU, _id?: string,
  //   img?: string

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre1, user.nombre2, user.apellido1,
        user.apellido2, user.email, user.cedula, user.sexo, user.fechaNacimiento,
        user.estadoCivil, user.tipoDeSangre, user.direccion1, user.direccion2, user.celular1,
        user.celular2, '', user.role, user.especialidad,
        user._id, user.img));
  }

  private transformarProductos(resultados: any[]): Producto[] {
    return resultados;
  }
  private transformarPacientes(resultados: any[]): Paciente[] {
    return resultados;
  }

  private transformarCategorias(resultados: any[]): Categoria[] {
    return resultados;
  }

  private transformarEspecialidades(resultados: any[]): Especialidad[] {
    return resultados;
  }

  buscar(tipo: 'usuarios'|'productos'|'pacientes'| 'categorias' | 'especialidades', termino: string) {
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

            case 'pacientes':
             return  this.transformarPacientes(resp.resultados);

            case 'categorias':
             return  this.transformarCategorias(resp.resultados);

            case 'especialidades':
             return  this.transformarEspecialidades(resp.resultados);

           default:
             return [];
         }
        }
        //  resp.resultado)
      ));
  }
}
