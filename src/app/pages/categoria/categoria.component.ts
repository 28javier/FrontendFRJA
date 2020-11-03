import { Component, OnInit} from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: [
  ]
})
export class CategoriaComponent implements OnInit {

  public totalCa: number = 0;
  public categorias: Categoria[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.cargaCategoriaPa();
    this.categoriaService.cargaCategoria.subscribe(resp => this.cargaCategoriaPa());
  }

  // cargar categoria paginadas comienzo
  cargaCategoriaPa() {
    this.cargando = true;
    this.categoriaService.cargarCategoriaPaginada(this.desde)
    .subscribe(({totalCategoria, categoria}) => {
      this.totalCa = totalCategoria;
      if (categoria.length !== 0) {
        this.categorias = categoria;
        this.cargando = false;
      }
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalCa) {
      this.desde -= valor;
    }
    this.cargaCategoriaPa();
   }
   // cargar categoria paginadas fin

   // crear categoria
   abrirModalCategoria(){
    // console.log(usuario);
    this.categoriaService.abrirModalCategoria();
  }

 

  eliminarCategoria(categoria: Categoria) {
    Swal.fire({
      title: '¿Desea Eliminar esta Categoria?',
      text: `Esta a punto de eliminar a ${categoria.nombreCategoria}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
    this.categoriaService.eliminarCategoria(categoria._id)
      .subscribe( resp => {
        this.cargaCategoriaPa();
        Swal.fire('Eliminado', categoria.nombreCategoria, 'success');
      }, err => {
        Swal.fire('Error', err.error.message, 'error');
      });
   }
  });
  }

  actualizarCategoria(categoria: Categoria) {
    // console.log(categoria);
    Swal.fire({
      title: '¿Desea Editar esta Categoria?',
      text: `Esta a punto de Editar a ${categoria.nombreCategoria}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si Editarlo'
    }).then((result) => {
      if (result.value) {
    this.categoriaService.actualizarCategoria(categoria._id, categoria.nombreCategoria, categoria.descripcionCategoria)
    .subscribe(resp => {
      Swal.fire('Actualizado', categoria.nombreCategoria, 'info');
      this.cargaCategoriaPa();
    }, err => {
      Swal.fire('Error', err.error.message, 'error');
    });
    }
    });
  }

}
