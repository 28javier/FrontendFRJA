import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Especialidad } from '../models/especialidad.model';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor( private http: HttpClient) { }

cargarEspecialidades() {
  const url = `${base_url}/especialidades`;
  return this.http.get(url)
    .pipe(
      map( (resp: {ok: boolean, especialidad: Especialidad[]}) => resp.especialidad)
    );
}
crearEspecialidades(name: string) {
  const url = `${base_url}/especialidades`;
  return this.http.post(url, {name});
}
// tslint:disable-next-line: variable-name
actualizarEspecialidades( _id: string, name: string ) {
  const url = `${base_url}/especialidades/${_id}`;
  return this.http.put(url, {name});
}
deleteEspecialidades(_id: string ) {
  const url = `${base_url}/especialidades/${_id}`;
  return this.http.delete(url);
}
}
