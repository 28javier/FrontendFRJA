import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { CargarProductoI } from '../interfaces/cargar-producto';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor( private http: HttpClient) { }


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

// cargar todos los productos
cargarProductos() {
  // localhost:3000/api/productos
  const url = `${base_url}/productos`;
  return this.http.get(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, productos: Producto[]}) => resp.productos)
    );
}

// cargar de forma paginada los productos
cargarProductosPagina(desde: number = 0) {
  // localhost:3000/api/productos/paginado?desde=1
  const url = `${base_url}/productos/paginado?desde=${desde}`;
  return this.http.get<CargarProductoI>(url, this.headers);
}

// cargar producto por ID
obtenerProductoID(id: string) {
  // localhost:3000/api/productos/5f7c8c949af3e139a4669825
  const url = `${base_url}/productos/${id}`;
  return this.http.get(url, this.headers)
    .pipe(
      map( (resp: {ok: boolean, producto: Producto}) => resp.producto)
    );
}

// crear los productos
crearProducto(producto: Producto) {
  // localhost:3000/api/productos
  const url = `${base_url}/productos`;
  return this.http.post(url, producto, this.headers);
}

// actualizar los productos
actualizarProducto( producto: Producto ) {
  // localhost:3000/api/productos/5f7c8c949af3e139a4669825
  const url = `${base_url}/productos/${producto._id}`;
  return this.http.put(url, producto, this.headers);
}

// eliminar una los productos
deleteProducto( producto: Producto ) {
  // localhost:3000/api/productos/5f7c8c949af3e139a4669825
  const url = `${base_url}/productos/${producto._id}`;
  return this.http.delete(url, this.headers);
}

}
