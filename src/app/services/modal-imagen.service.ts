import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  // tslint:disable-next-line: variable-name
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'productos';
  public id: string;
  public img: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  get ocultarModal(){
    return this._ocultarModal;
  }

  abrilModal(tipo: 'usuarios'|'productos', id: string, img: string = 'no-img') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // }upload/usuarios/5f74d947d839384af4d2bdf3
    if (img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
    // this.img = img;

  }
  cerrarModal() {
    this._ocultarModal = true;
  }
  
  constructor() { }
}
