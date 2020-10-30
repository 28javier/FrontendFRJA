import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Especialidad } from '../models/especialidad.model';
import { map } from 'rxjs/operators';
import { CargarEspecialidad } from '../interfaces/cargar-especialidades';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor( private http: HttpClient) { }




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

// cargar todas las especialidades
cargarEspecialidades() {
  // localhost:3000/api/especialidades?desde=5
  const url = `${base_url}/especialidades`;
  return this.http.get(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, especialidad: Especialidad[]}) => resp.especialidad)
    );
}

// cargar de forma paginada las especialidades
cargarEspecialidadPagina(desde: number = 0) {
  // localhost:3000/api/especialidades/paginado?desde=4
  const url = `${base_url}/especialidades/paginado?desde=${desde}`;
  return this.http.get<CargarEspecialidad>(url, this.headers);
}



// crear usuarios
crearEspecialidades(name: string) {
  const url = `${base_url}/especialidades`;
  return this.http.post(url, {name}, this.headers);
}

// actualizar una especialidad
// tslint:disable-next-line: variable-name
actualizarEspecialidades( _id: string, name: string ) {
  const url = `${base_url}/especialidades/${_id}`;
  return this.http.put(url, {name}, this.headers);
}

// eliminar una especialidad
// tslint:disable-next-line: variable-name
deleteEspecialidades( _id: string ) {
  const url = `${base_url}/especialidades/${_id}`;
  return this.http.delete(url, this.headers);
}
}
