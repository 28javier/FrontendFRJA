import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { VentaM } from '../models/venta.model';
import { CargarVentaI } from '../interfaces/cargar-venta';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VentasService {



  constructor(private http: HttpClient) { 
                
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



  cargarVentas() {
    // localhost:3000/api/ventas
    const url = `${base_url}/ventas`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: {ok: boolean, venta: VentaM[]}) => resp.venta)
      );
  }
  
  ventasPaginada(desde: number = 0){
    // localhost:3000/api/ventas/paginado?desde=1
    const url = `${base_url}/ventas/paginado?desde=${desde}`;
    return this.http.get<CargarVentaI>(url, this.headers);
  }

  ventaId(id): Observable<any>{
    // localhost:3000/api/ventas/5fe77ba86498dd2064ba97d7
    const url = `${base_url}/ventas/${id}`;
    return this.http.get(url, this.headers);
  }

  save_data(data): Observable <any>{
    // localhost:3000/api/ventas
    const url = `${base_url}/ventas`;
    return this.http.post(url, data, this.headers);
  }

  // eliminar una los productos
deleteVenta( venta: VentaM ) {
  // localhost:3000/api/ventas/5ff48f4c3f9cc6407c4f8f41
    const url = `${base_url}/ventas/${venta._id}`;
  return this.http.delete(url, this.headers);
}

}
