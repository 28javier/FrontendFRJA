import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Paciente } from '../../../models/paciente.model';
import { Producto } from '../../../models/producto.model';
import { PacienteService } from '../../../services/paciente.service';
import { ProductoService } from '../../../services/producto.service';
import { VentaM } from '../../../models/venta.model';
import { DetalleVentaM } from '../../../models/detalleVenta.model';
import { Usuario } from '../../../models/usuario.model';
import { VentasService } from '../../../services/ventas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ventas-create',
  templateUrl: './ventas-create.component.html',
  styles: [
  ]
})
export class VentasCreateComponent implements OnInit {


  public pacientes: Paciente[] = [];
  public productos: Producto[] = [];
  public productoID: any = {
    sctokProducto: '--/--',
  };
  public venta: any = {
    idcliente: '',
  }
  public total = 0;
  public data_detalle : Array<any> = [];
  public detalle: any = {
    idproducto: '',
  };
  public error_message;
  public usuario: Usuario;


  constructor(private usuarioService: UsuarioService,
              private pacienteService: PacienteService,
              private productoService: ProductoService,
              private ventaService: VentasService,
              private router: Router) {

    this.usuario = this.usuarioService.usuario;
    // console.log(this.usuario);
   }

  ngOnInit(): void {
        // this.identity = this.usuarioService.getIdentity();
        this.cargarPacientes();
        this.cargarProductos();        

  }

  cargarPacientes() {
    // this.cargando = true;
    this.pacienteService.cargarPacientes().subscribe(
      pacientes => {
        // console.log(pacientes);
        // this.cargando = false;
        this.pacientes = pacientes;
      },
      erro => {console.log(erro); }
    );
  }

  cargarProductos(){
    this.productoService.cargarProductos().subscribe(
      productos => {
        // console.log(productos);
        this.productos = productos;
      },
      erro => {console.log(erro);
      }
    )
  }

  cargarProductoId(id){
    this.productoService.obtenerProductoID(id).subscribe(
      producto => {
        // console.log(producto);
        // console.log(producto.stockProducto);
        this.productoID = producto;
        // console.log(this.productoID);
        
      },
      erro => {
        console.log(erro);
      }
    )
  }

  close_alert(){
    this.error_message = '';
  }

  guardar_detalle(detalleForm){
   if(detalleForm.valid){
  if(detalleForm.value.cantidad <= this.productoID.stockProducto){
    this.data_detalle.push({
      idproducto : detalleForm.value.idproducto,
      cantidad: detalleForm.value.cantidad,
      nombreproducto: this.productoID.nombreProducto,
      precioProducto : this.productoID.precioProducto
    });

    this.detalle = new DetalleVentaM('','',null);
    this.productoID.stockProducto = '--|--',
    // console.log(this.data_detalle);
    

    this.total = this.total + (parseFloat(this.productoID.precioProducto) * parseFloat(detalleForm.value.cantidad));
    // console.log( this.total);
  }
  else{
    this.error_message = 'No existe el suficiente stock para la venta';
  }
}else{
console.log("error");
}
  }

  eliminar(idx,precioProducto,cantidad){
    this.data_detalle.splice(idx,1);
    this.total = this.total - (parseFloat(precioProducto) * parseFloat(cantidad));
  }

  onSubmit(ventaForm){
    if (ventaForm.valid) {
      // console.log('Correcto');
      if (ventaForm.value.idcliente != '') {
        let data = {
          paciente: ventaForm.value.idcliente,
          usuario: this.usuario._id,
          detalles: this.data_detalle
        }

        this.ventaService.save_data(data).subscribe(
          response =>{
            Swal.fire('Venta', 'Venta Registrada Correctamente', 'success');
            this.router.navigateByUrl('/dashboard/venta');
          },
          erro => {
            Swal.fire('Error al crear la venta', erro.error.message, 'error');
            // console.log('Error al crear la venta');
            
          }
        )
        // console.log(data);
        
      }else
      Swal.fire('Error al crear la venta', 'Error', 'error');
      console.log('Error');
      
      
    }else{
      Swal.fire('Error al crear la venta', 'Error', 'error');
      console.log('error');
      
    }
  }

}





