import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CargarCategoria } from '../interfaces/cargar-categoria';
import { CategoriaI } from '../interfaces/categoria.interface';
import { map } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private _ocultarModal: boolean = true;
  private _ocultarModalA: boolean = true;

  public cargaCategoria: EventEmitter<any> = new EventEmitter<any>();

  constructor( private http: HttpClient) { }

    // modal para crear la categoria
  get ocultarModal(){
      return this._ocultarModal;
  }
  abrirModalCategoria() {
    this._ocultarModal = false;
  }
  cerrarModal() {
      this._ocultarModal = true;
  }

   // modal para crear la categoria
get ocultarModalA(){
    return this._ocultarModalA;
}
abrirModalCategoriaA() {
  this._ocultarModalA = false;
}
cerrarModalA() {
    this._ocultarModalA = true;
}

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

  //carga de todas las especialidades
  cargarCategorias() {
    // localhost:3000/api/categorias
    const url = `${base_url}/categorias`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, categoria: Categoria[]}) => resp.categoria)
    );

  }
  // mostar la categoria paginada
  cargarCategoriaPaginada( desde: number = 0) {
    // localhost:3000/api/categorias/paginado?desde=0
    const url = `${base_url}/categorias/paginado?desde=${desde}`;
    return this.http.get<CargarCategoria>(url, this.headers);
  }

  categoriaID(id: string) {
    // localhost:3000/api/categorias/5f74e6f50e2f1c18bcb2dba3
    const url = `${base_url}/categorias/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, categoria: Categoria}) => resp.categoria)
    );
  }


  crearCategoria(formData: CategoriaI) {
    // localhost:3000/api/categorias
    const url = `${base_url}/categorias`;
    return this.http.post(url, formData, this.headers);
  }

  actualizarCategoria( _id: string, nombreCategoria: string, descripcionCategoria: string) {
    // localhost:3000/api/categorias/5f74e6f50e2f1c18bcb2dba3
    const url = `${base_url}/categorias/${_id}`;
    return this.http.put(url, {nombreCategoria, descripcionCategoria}, this.headers);
  }

  eliminarCategoria( _id: string) {
    // localhost:3000/api/categorias/5f74e6f50e2f1c18bcb2dba3
    const url = `${base_url}/categorias/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
