import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {
  public totalUsuario: number = 0;
  public usuarios: Usuario[] =[];
  public usuariosTemp: Usuario[] =[];
  public imgSusb: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor( private usuarioServices: UsuarioService,
               private busquedaService: BusquedasService,
               public modalImagenService: ModalImagenService) { }


  ngOnDestroy(): void {
  this.imgSusb.unsubscribe();
  }

  ngOnInit(): void {
  this.cargarUsuarios();
  this.imgSusb = this.modalImagenService.nuevaImagen
  .pipe(
    delay(100)
  )
  .subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioServices.cargarUsuarios(this.desde)
    .subscribe( ({totalUsuario, usuarios}) => {
      // console.log(usuarios);
      this.totalUsuario = totalUsuario;
      if (usuarios.length !== 0) {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }
    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuario){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.busqueda('usuarios', termino)
      .subscribe(resp => {
        this.usuarios = resp;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    // validacion para no eliminarme si estoy logiado
    if (usuario._id === this.usuarioServices.uid) {
      return Swal.fire('Error', 'No puedes eliminarte a ti mismo', 'error');
    }
    Swal.fire({
      title: '¿Desea Eliminar el Usuario?',
      text: `Esta a punto de eliminar a ${usuario.nombre2} ${usuario.apellido1} ${usuario.apellido2}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.usuarioServices.eliminarUsuario(usuario)
        .subscribe(resp => {
          this.cargarUsuarios();
          Swal.fire('Usuario Eliminado',
          `${usuario.nombre2} ${usuario.apellido1} ${usuario.apellido2} eliminado correctamente`, 'success');
        }, err => {
          Swal.fire('Error', err.error.message, 'error');
        });
      }
    });
  }

  cambiarRol(usuario: Usuario) {
      // console.log(usuario);
      this.usuarioServices.actualizarRole(usuario)
        .subscribe(resp => {
          // console.log(resp);
        }, err => {
          Swal.fire('Error', err.error.message, 'error');
        });
  }


  abrirModalImagen(usuario: Usuario){
    // console.log(usuario);
    this.modalImagenService.abrilModal('usuarios', usuario._id, usuario.img);
  }

}
