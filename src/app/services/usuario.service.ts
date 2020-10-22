import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login.interface';
import { RegistroUsuario } from '../interfaces/registro.usuario.interface';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router) {

   }

   // obtener el token en cada ruta
   get token(){
     return localStorage.getItem('token') || '';
   }
   get uid(){
     return this.usuario._id || '';
   }

   // funcion para no poder ingresar en las demas pantallas si no esta logueado
   validarToken(): Observable<boolean> {
    //  const token = localStorage.getItem('token') || '';
     return this.http.get(`${base_url}/login/renew`, {
       headers: {
         'x-token': this.token
       }
     }).pipe(
       map((resp: any) => {
        //  console.log(resp);
         const {nombre1, nombre2, apellido1, apellido2, email, role, especialidad, _id, img =''} = resp.usuario;
         this.usuario = new Usuario(nombre1, nombre2, apellido1, apellido2, email, '', role, especialidad, _id, img);
        //  this.usuario.imprimirUsuario();
         localStorage.setItem('token', resp.token);
         return true;
       }),
       catchError(error => of(false))
     );
   }

   logout() {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
   }
   login( formDataLogin: LoginForm) {
    return this.http.post(`${base_url}/login`, formDataLogin)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
      })
    );
   }

   crearUsuario( formData: RegistroUsuario) {
    console.log('Creando Usuario');
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
    })
  );
 }

 actualizarPerfil(data: {email: string, password: string}) {
   return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
    headers: {
      'x-token': this.token
    }
   });

 }


}
