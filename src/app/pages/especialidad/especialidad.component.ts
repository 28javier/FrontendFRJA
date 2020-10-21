import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../services/especialidad.service';
import { Especialidad } from '../../models/especialidad.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styles: [
  ]
})
export class EspecialidadComponent implements OnInit {

  public especialidades: Especialidad[] = [];
  public cargando: boolean = true;

  constructor( public especialidadService: EspecialidadService) { }

  ngOnInit(): void {
     this.cargarEspecialidades();
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
  this.especialidadService.deleteEspecialidades(especialidad._id)
    .subscribe( resp => {
      this.cargarEspecialidades();
      Swal.fire('Eliminado', especialidad.name, 'success');
    }, err => {
      Swal.fire('Error', err.error.message, 'error');
    });
// console.log(especialidad);
}

async abriSwictAlert(){
  const {value} = await Swal.fire<string>({
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

}
