import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VentasService } from '../../../services/ventas.service';
import { VentaM } from '../../../models/venta.model';

@Component({
  selector: 'app-ventas-detalle',
  templateUrl: './ventas-detalle.component.html',
  styles: [
  ]
})
export class VentasDetalleComponent implements OnInit {

  public id;
  public venta: any = {
    paciente: '',
    usuario: ''
  };
  public detalleVenta;
  constructor(
    private _router: ActivatedRoute,
    private ventaService: VentasService
  ) { }

  ngOnInit(): void {
   
    this._router.params.subscribe(({id})=>{
      // this.id = params['id'];
    this.cargarVentaId(id);
     
    });
  }

  cargarVentaId(id: string){
    this.ventaService.ventaId(id).subscribe(
      response=>{
        this.venta = response.data.venta;
        this.detalleVenta = response.data.detalles;
        // console.log(response);
        
      },
      error=>{

      }
    );
  }

 
  
}
