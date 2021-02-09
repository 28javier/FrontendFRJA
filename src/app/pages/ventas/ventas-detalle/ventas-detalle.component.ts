import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VentasService } from '../../../services/ventas.service';
import * as html2pdf from 'html2pdf.js';

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

  descargarPdf(){
   
    const options = {
      filename: 'FRJ_file.pdf',
      image: {type: 'jpeg'},
      htmlcanvas: {},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }; 
    const content: Element = document.getElementById('content');
    html2pdf()
    .from(content)
    .set(options)
    .save();
  }
 
  
}
