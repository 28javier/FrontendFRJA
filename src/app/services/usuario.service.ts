import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login.interface';
import { RegistroUsuario } from '../interfaces/registro.usuario.interface';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router) {

   }

   // funcion para no poder ingresar en las demas pantallas si no esta logueado
   validarToken(): Observable<boolean> {
     const token = localStorage.getItem('token') || '';
     return this.http.get(`${base_url}/login/renew`, {
       headers: {
         'x-token': token
       }
     }).pipe(
       tap((resp: any) => {
        localStorage.setItem('token', resp.token);
       }),
       map(resp => true),
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




}
