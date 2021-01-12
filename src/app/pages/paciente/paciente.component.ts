import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from '../../services/paciente.service';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styles: [
  ]
})
export class PacienteComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 0;
  public totalPacientes: number = 0;
  public pacientes: Paciente[] = [];

  constructor( private pacienteService: PacienteService,
               private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarPacientePa();
  }


  cargarPacientePa() {
    this.cargando = true;
    this.pacienteService.cargarPacientesPa(this.desde)
    .subscribe(({TotalPaciente, paciente}) => {
      // console.log(paciente);
      this.totalPacientes = TotalPaciente;
      if (paciente.length !== 0 ) {
        this.pacientes = paciente;
        this.cargando = false;
      }
    });
  }
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalPacientes) {
      this.desde -= valor;
    }
    this.cargarPacientePa();
   }

   buscar(termino: string) {
    // console.log(termino);
    if (termino.length === 0) {
      return this.cargarPacientePa();
    }
    this.busquedaService.buscar( 'pacientes', termino)
      .subscribe(resp => {
        this.pacientes = resp;
      });
  }

  eliminarPaciente(paciente: Paciente) {
    Swal.fire({
      title: '¿Desea Eliminar el Producto?',
      text: `Esta a punto de eliminar a ${paciente.nombreP2} ${paciente.apellidoP} ${paciente.apellidoP2}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminarlo'
    }).then((result) => {
      if (result.value) {
        this.pacienteService.borrarPaciente(paciente)
        .subscribe(resp => {
          this.cargarPacientePa();
          Swal.fire('Paciente Eliminado',
          `${paciente.nombreP2} eliminado correctamente`, 'success');
        }, err => {
          Swal.fire('Error', err.error.message, 'error');
        });
      }
    });
  }






}
