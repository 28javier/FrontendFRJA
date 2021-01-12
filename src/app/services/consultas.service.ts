import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { CargarConsultasI } from '../interfaces/cargar-consultas';
import { ConsultaM } from '../models/consulta.model';
import { map } from 'rxjs/operators';



const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

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

  cargarPacientesPa(desde: number = 0){
    // localhost:3000/api/pacientes/paginado?desde=0
    // {{url}}evaluacionPaciente/paginado?desde=2
    const url = `${base_url}/evaluacionPaciente/paginado?desde=${desde}`;
    return this.http.get<CargarConsultasI>(url, this.headers);
    }
    
    crearConsulta(consulta: ConsultaM){
          // localhost:3000/api/evaluacionPaciente
          const url = `${base_url}/evaluacionPaciente`;
          return this.http.post(url, consulta,this.headers)
    }

  deleteConsulta(consulta: ConsultaM){
    // // localhost:3000/api/evaluacionPaciente/5f823ca0d56a6308ac3a08d6
    const url = `${base_url}/evaluacionPaciente/${consulta._id}`;
    return this.http.delete(url, this.headers)
  }

  cargarConsultaId(id: string){
    // localhost:3000/api/evaluacionPaciente/5f82350e1d545f3b9c344ce8
    const url = `${base_url}/evaluacionPaciente/${id}`;
  return this.http.get(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, evaluacionPaciente: ConsultaM}) => resp.evaluacionPaciente)
    );
  }

}
