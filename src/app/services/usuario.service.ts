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
  public identity;

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

   get role(): 'Admin_Role' | 'Secrt_Role' | 'Medic_Role'{
      return this.usuario.role
   }

   get headers() {
     return {
      headers: {
        'x-token': this.token
      }
     };
   }

   guardarLocalStorage(token: string, menu: any){
      
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
   }

   getIdentity(): Observable<any> {
     let identity = localStorage.getItem('email');
     if (identity) {
      this.identity = identity;
      // console.log(identity);
      
    }else{
      this.identity = null;
    }
    return this.identity;
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
         const {nombre1, nombre2, apellido1, apellido2, email, cedula,
          sexo, fechaNacimiento, estadoCivil, tipoDeSangre, direccion1,
          direccion2, celular1, celular2, role, especialidad, _id, img = ''} = resp.usuario;
         this.usuario = new Usuario(nombre1, nombre2, apellido1, apellido2, email, cedula,
          sexo, fechaNacimiento, estadoCivil, tipoDeSangre, direccion1,
          direccion2, celular1, celular2, '', role, especialidad, _id, img);
        //  this.usuario.imprimirUsuario();
         this.guardarLocalStorage(resp.token, resp.menu);
         return true;
       }),
       catchError(error => of(false))
     );
   }

   logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('menu');
      this.router.navigateByUrl('/login');
   }
   login( formDataLogin: LoginForm) {
    return this.http.post(`${base_url}/login`, formDataLogin)
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);

      })
    );
   }

   crearUsuario( formData: RegistroUsuario) {
    console.log('Creando Usuario');
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
    })
  );
 }

 actualizarPerfil(data: {email: string, password: string, role: string,
                          nombre1: string, nombre2: string, apellido1: string,
                        apellido2: string, cedula: number
                      }) {

  data = {
    ...data,
    role: this.usuario.role,
  };
  return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
 }

//  actualizarPerfil2(data: {email: string, password: string, role: string,
//                     nombre1: string, nombre2: string, apellido1: string,
//                     apellido2: string, especialidad: string, cedula: number,
//                     direccion1: string, direccion2: string, celular1: string,
//                     celular2: string, fechaDeNacimiento: string, estadoCivil: string,
//                     tipoDeSangre: string, sexo: string
//                   }) {
//       data = {
//           ...data,
//         password: this.usuario.password,
//         email: this.usuario.email
// };
//       return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
// }
actualizarPerfil2( data: Usuario ) {
  // localhost:3000/api/productos/5f7c8c949af3e139a4669825
  const data1 = {...data,
  password: this.usuario.password}
  const url = `${base_url}/usuarios/${data._id}`;
  return this.http.put(url, data1, this.headers);
}

 cargarUsuarios(desde: number = 0) {
  // localhost:3000/api/usuarios?desde=0
  const url = `${base_url}/usuarios?desde=${desde}`;
  return this.http.get<CargarUsuarios>(url, this.headers)
          .pipe(
            map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre1, user.nombre2, user.apellido1, user.apellido2,
                     user.email, user.cedula, user.sexo, user.fechaNacimiento, user.estadoCivil,
                     user.tipoDeSangre, user.direccion1, user.direccion2, user.celular1,
                     user.celular2, '', user.role, user.especialidad, user._id, user.img)
                     );
                return {totalUsuario: resp.totalUsuario,
                usuarios};
            })
          );
 }
//  user.nombre1, user.nombre2, user.apellido1, user.apellido2,
//                      user.email, user.cedula, user.sexo, user.fechaNacimiento, user.estadoCivil,
//                      user.tipoDeSangre, user.direccion1, user.direccion2, user.celular1, user.celular2,
//                      '', user.role, user.especialidad, user.img, user._id

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
