import { Component, OnInit } from '@angular/core';
import { ConsultaM } from 'src/app/models/consulta.model';
import { ConsultasService } from '../../services/consultas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styles: [
  ]
})
export class ConsultasComponent implements OnInit {

  public cargando: boolean = true;
  public evaluacionPacientes: any[] = [];
  public desde: number = 0;
  public totalConsultas: number = 0;

  public filterConsulta = '';



  constructor( private consultaService: ConsultasService) { }

  ngOnInit(): void {
    this.cargarProductoPa();
  }

  cargarProductoPa() {
    this.cargando = true;
    this.consultaService.cargarPacientesPa(this.desde)
   .subscribe( ({totalEvaluaciones, evaluacionPaciente}) => {
    //  console.log(evaluacionPaciente);
     this.totalConsultas = totalEvaluaciones;
     if (evaluacionPaciente.length !== 0) {
      this.evaluacionPacientes = evaluacionPaciente;
      this.cargando = false;
    }
   });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalConsultas) {
      this.desde -= valor;
    }
    this.cargarProductoPa();
   }

   deleteConsulta(consulta: ConsultaM){
    Swal.fire({
      title: '¿Desea Eliminar esta Consulta?',
      text: `Esta a punto de eliminar la consulta del Paciente: ${consulta.paciente.apellidoP} ${consulta.paciente.apellidoP2} ${consulta.paciente.nombreP}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminarlo'
            }).then((result) => {
      if (result.value) {
        this.consultaService.deleteConsulta(consulta)
        .subscribe(resp => {
          this.cargarProductoPa();
          Swal.fire('Consulta Eliminada',
          `Consulta eliminada correctamente`, 'success');
        }, err => {
          Swal.fire('Error', err.error.message, 'error');
        });
      }
    });
  }
}

