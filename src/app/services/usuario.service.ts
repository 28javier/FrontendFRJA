import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RegistroUsuario } from '../interfaces/registro.usuario.interface';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  constructor( private http: HttpClient) {

   }

   crearUsuario( formData: RegistroUsuario) {
    console.log('Creando Usuario');
    return this.http.post(`${base_url}/usuarios`, formData);
   }
}
