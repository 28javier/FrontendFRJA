import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CargarCategoria } from '../interfaces/cargar-categoria';
import { CategoriaI } from '../interfaces/categoria.interface';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private _ocultarModal: boolean = true;
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

  // mostar la categoria paginada
  cargarCategoriaPaginada( desde: number = 0) {
    // localhost:3000/api/categorias/paginado?desde=0
    const url = `${base_url}/categorias/paginado?desde=${desde}`;
    return this.http.get<CargarCategoria>(url, this.headers);
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  crearCategoria(formData: CategoriaI) {
    // localhost:3000/api/categorias
    const url = `${base_url}/categorias`;
    return this.http.post(url, formData, this.headers);
  }

  actualizarCategoria( _id: string, nombreCategoria: string, descripcionCategoria: string) {
    // localhost:3000/api/categorias/5f74e6f50e2f1c18bcb2dba3
    this._ocultarModal = false;
    const url = `${base_url}/categorias/${_id}`;
    return this.http.put(url, {nombreCategoria, descripcionCategoria}, this.headers);
  }

  eliminarCategoria( _id: string) {
    // localhost:3000/api/categorias/5f74e6f50e2f1c18bcb2dba3
    const url = `${base_url}/categorias/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
