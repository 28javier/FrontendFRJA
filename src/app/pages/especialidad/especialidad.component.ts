import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';
import { Especialidad } from '../../models/especialidad.model';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styles: [
  ]
})
export class EspecialidadComponent implements OnInit {

  public totalEspecialidad: number = 0;
  public especialidades: Especialidad[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( public especialidadService: EspecialidadService,
              public busquedaService: BusquedasService) { }

  ngOnInit(): void {
     this.cargarEspecialidades();
     this.cargarEspecialidadPa();
  }

 cargarEspecialidades() {
  this.cargando = true;
  this.especialidadService.cargarEspecialidades().subscribe(
    especialidad => {
      this.cargando = false;
      this.especialidades = especialidad;
    },
    erro => {console.log(erro); }
  );
 }

 cargarEspecialidadPa() {
   this.cargando = true;
   this.especialidadService.cargarEspecialidadPagina(this.desde)
   .subscribe( ({totalEspecialidad, especialidad}) => {
    this.totalEspecialidad = totalEspecialidad;
    if (especialidad.length !== 0) {
      this.especialidades = especialidad;
      this.cargando = false;
    }
   });
 }
 cambiarPagina(valor: number) {
  this.desde += valor;
  if (this.desde < 0) {
    this.desde = 0;
  } else if (this.desde >= this.totalEspecialidad) {
    this.desde -= valor;
  }
  this.cargarEspecialidadPa();
 }

 actualizarEspecialidad(especialidad: Especialidad){
    this.especialidadService.actualizarEspecialidades(especialidad._id, especialidad.name)
      .subscribe( resp => {
        Swal.fire('Actualizado', especialidad.name, 'success');
      }, err => {
        Swal.fire('Error', err.error.message, 'error');
      });
  // console.log(especialidad);
 }

 borrarEspecialidad(especialidad: Especialidad){
   Swal.fire({
    title: '¿Desea Eliminar el Usuario?',
    text: `Esta a punto de eliminar a ${especialidad.name}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si eliminarlo'
  }).then((result) => {
    if (result.value) {
  this.especialidadService.deleteEspecialidades(especialidad._id)
    .subscribe( resp => {
      this.cargarEspecialidades();
      Swal.fire('Eliminado', especialidad.name, 'success');
    }, err => {
      Swal.fire('Error', err.error.message, 'error');
    });
// console.log(especialidad);
 }
});
}

async abriSwictAlert(){
  const {value = ''} = await Swal.fire<string>({
    title: 'Agregar Especialidad',
    text: 'Ingrese una nueva Especialidad',
    input: 'text',
    inputPlaceholder: 'Nombre de la especialidad',
    showCancelButton: true
  })
  if (value.trim().length > 0) {
    this.especialidadService.crearEspecialidades(value)
      .subscribe((resp: any) => {
        this.especialidades.push(resp.especialidad);
      }, err => {
        Swal.fire('Error', err.error.message, 'error');
      });
  }
}

buscar(termino: string) {
  // console.log(termino);
  if (termino.length === 0) {
    return this.cargarEspecialidadPa();
  }
  this.busquedaService.buscar('especialidades', termino)
    .subscribe( (resp: Especialidad[]) => {
      this.especialidades = resp;
    });
}

}
