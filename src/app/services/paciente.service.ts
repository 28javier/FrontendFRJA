import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { Paciente } from '../models/paciente.model';
import { CargarPacienteI } from '../interfaces/cargar-paciente';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

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


cargarPacientes() {
// localhost:3000/api/pacientes
  const url = `${base_url}/pacientes`;
  return this.http.get(url, this.headers)
  .pipe(
    map( (resp: {ok: boolean, pacientes: Paciente[]}) => resp.pacientes)
  );
}

cargarPacientesPa(desde: number = 0){
// localhost:3000/api/pacientes/paginado?desde=0
const url = `${base_url}/pacientes/paginado?desde=${desde}`;
return this.http.get<CargarPacienteI>(url, this.headers);
}


cargarPacienteId(id: string) {
// localhost:3000/api/pacientes/5f7769b0d821f53668afdb65
  const url = `${base_url}/pacientes/${id}`;
  return this.http.get(url, this.headers)
  .pipe(
    map( (resp: {ok: boolean, paciente: Paciente}) => resp.paciente)
  );
}

crearPaciente(paciente: Paciente) {
  // localhost:3000/api/pacientes
  const url = `${base_url}/pacientes`;
  return this.http.post(url, paciente, this.headers);
}

editarPaciente(paciente: Paciente) {
// localhost:3000/api/pacientes/5f7769b0d821f53668afdb65
  const url = `${base_url}/pacientes/${paciente._id}`;
  return this.http.put(url, paciente, this.headers);
}

borrarPaciente(paciente: Paciente) {
// localhost:3000/api/pacientes/5f7769b0d821f53668afdb65
const url = `${base_url}/pacientes/${paciente._id}`;
return this.http.delete(url, this.headers);

}



}




