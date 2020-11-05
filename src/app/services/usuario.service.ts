import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
// modelo
import { Usuario } from '../models/usuario.model';
// interfaces
import { RegistroUsuario } from '../interfaces/registro.usuario.interface';
import { LoginForm } from '../interfaces/login.interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarios';



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

   get headers() {
     return {
      headers: {
        'x-token': this.token
      }
     };
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

 actualizarPerfil(data: {email: string, password: string, role: string}) {

  data = {
    ...data,
    role: this.usuario.role
  };
  return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
 }

 cargarUsuarios(desde: number = 0) {
  // localhost:3000/api/usuarios?desde=0
  const url = `${base_url}/usuarios?desde=${desde}`;
  return this.http.get<CargarUsuarios>(url, this.headers)
          .pipe(
            map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre1, user.nombre2, user.apellido1,
                    user.apellido2, user.email, '', user.role, user.especialidad,
                    user._id, user.img));
                return {totalUsuario: resp.totalUsuario,
                usuarios};
            })
          );
 }

 obtenerUsuarioID(id: string){
  // localhost:3000/api/usuarios/5f96ffca65784e2c48b1ac53
  const url = `${base_url}/usuarios/${id}`;
  return this.http.get(url, this.headers)
  .pipe(
    map((resp: {ok: boolean, usuario: Usuario}) => resp.usuario)
  );

 }

 eliminarUsuario(usuario: Usuario) {
  //  console.log('eliminado');
   const url = `${base_url}/usuarios/${usuario._id}`;
   return this.http.delete(url, this.headers);
 }

 actualizarRole(usuario: Usuario) {
   const url = `${base_url}/usuarios/${usuario._id}`;
   return this.http.put(url, usuario, this.headers);
 }



}
