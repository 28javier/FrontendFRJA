import { Component, OnInit } from '@angular/core';
import { VentaM } from '../../models/venta.model';
import { VentasService } from '../../services/ventas.service';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: [
  ]
})
export class VentasComponent implements OnInit {

  public cargando: boolean = true;
  public ventas: VentaM[] = [];
  public desde: number = 0;
  public totalVenta: number = 0;

  constructor(private ventaService: VentasService,
              private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarVentaPa();
  }

  cargarVentaPa() {
    this.cargando = true;
    this.ventaService.ventasPaginada(this.desde)
   .subscribe( ({totalVentas, venta}) => {
    //  console.log(venta);
     this.totalVenta = totalVentas;
     if (venta.length !== 0) {
      this.ventas = venta;
      this.cargando = false;
    }
   });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalVenta) {
      this.desde -= valor;
    }
    this.cargarVentaPa();
   }

   buscar(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      return this.cargarVentaPa();
    }
    this.busquedaService.buscar('productos', termino)
      .subscribe(resp => {
        // this.productos = resp;
      });
  }

  borrarVenta(venta: VentaM){
    Swal.fire({
      title: '¿Desea Eliminar esta Venta?',
      text: `Esta a punto de eliminar la venta`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.ventaService.deleteVenta(venta)
        .subscribe(resp => {
          Swal.fire('Producto Eliminado',
          `Venta eliminada correctamente`, 'success');
          this.cargarVentaPa();
        }, err => {
          Swal.fire('Error', err.error.message, 'error');
        });
      }
    });
  }


}
