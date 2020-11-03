import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria.model';
import { ProductoService } from '../../../services/producto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { CargarProductoI } from '../../../interfaces/cargar-producto';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styles: [
  ]
})
export class RegistroProductoComponent implements OnInit {

  public productoForm: FormGroup;
  public categorias: Categoria[] = [];
  public productoSelecionado: Producto;


  constructor( private fb: FormBuilder,
               private categoriaService: CategoriaService,
               private productoService: ProductoService,
               private router: Router,
               private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({id}) => {
      // console.log(id);
      this.CargarProducto(id);
    });

    this.productoForm = this.fb.group({
      codigoProducto: ['', Validators.required],
      nombreProducto: ['', Validators.required],
      stockProducto: [, Validators.required],
      precioProducto: [, Validators.required],
      descripcionProducto: ['', ],
      categoria: ['', Validators.required]
    });

    this.cargarCategoria();
  }

  cargarCategoria(){
    this.categoriaService.cargarCategorias()
    .subscribe((categoria: Categoria[]) => {
      // console.log(categoria);
      this.categorias = categoria;
    });
  }

  CargarProducto(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.productoService.obtenerProductoID(id)
    .subscribe(producto => {
      if (!producto) {
        return this.router.navigateByUrl(`/dashboard/producto`);
      }
      // console.log(producto);
      const {codigoProducto, nombreProducto, stockProducto, precioProducto,
      descripcionProducto, categoria: { _id}} = producto;
      // console.log(codigoProducto, nombreProducto, stockProducto, precioProducto,
      //   descripcionProducto, _id);
      this.productoSelecionado = producto;
      this.productoForm.setValue({codigoProducto, nombreProducto, stockProducto, precioProducto,
           descripcionProducto, categoria: _id});
    });
  }


  guardarProducto() {
    const {nombreProducto} = this.productoForm.value;
    if (this.productoSelecionado) {
      // actualizar
      const data = {
        ...this.productoForm.value,
        _id: this.productoSelecionado._id
      }
      this.productoService.actualizarProducto(data)
      .subscribe(resp => {
        Swal.fire('Producto Actualizado', `${nombreProducto} actualizado Correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/producto`);
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error');
      });
    }else {
      // crear producto
      // const {nombreProducto} = this.productoForm.value;
      this.productoService.crearProducto(this.productoForm.value)
      .subscribe( (resp: any) => {
        console.log('Producto Creado');
        // console.log(resp);
        Swal.fire('Producto Creado', `${nombreProducto} creado Correctamente`, 'success');
        // this.router.navigateByUrl(`/dashboard/registro-producto/${resp.producto._id}`);
        this.router.navigateByUrl(`/dashboard/producto`);
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error');
      });
    }
  }

}
