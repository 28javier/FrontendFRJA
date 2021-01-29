import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})
export class ProductoComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public productos: Producto[] = [];
  public desde: number = 0;
  public totalProducto: number = 0;
  public imgSusb: Subscription;
  // public filterProducto = '';


  constructor( private productoService: ProductoService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService) { }


  ngOnDestroy(): void {
this.imgSusb.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarProductoPa();
    this.imgSusb = this.imgSusb = this.modalImagenService.nuevaImagen
  .pipe(
    delay(100)
  )
  .subscribe(img => this.cargarProductoPa());
  }

  cargarProductoPa() {
    this.cargando = true;
    this.productoService.cargarProductosPagina(this.desde)
   .subscribe( ({totalProductos, producto}) => {
    //  console.log(producto);
     this.totalProducto = totalProductos;
     if (producto.length !== 0) {
      this.productos = producto;
      this.cargando = false;
    }
   });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalProducto) {
      this.desde -= valor;
    }
    this.cargarProductoPa();
   }

   abrirModalImagen(producto: Producto) {
    this.modalImagenService.abrilModal('productos', producto._id, producto.img);
   }

   buscar(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      return this.cargarProductoPa();
    }
    this.busquedaService.buscar('productos', termino)
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
      });
  }

  borrarProducto(producto: Producto){
    Swal.fire({
      title: '¿Desea Eliminar el Producto?',
      text: `Esta a punto de eliminar a ${producto.nombreProducto}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.productoService.deleteProducto(producto)
        .subscribe(resp => {
          this.cargarProductoPa();
          Swal.fire('Producto Eliminado',
          `${producto.nombreProducto} eliminado correctamente`, 'success');
        }, err => {
          Swal.fire('Error', err.error.message, 'error');
        });
      }
    });
  }

}
