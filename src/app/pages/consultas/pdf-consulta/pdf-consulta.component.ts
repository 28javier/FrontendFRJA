import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../../../services/consultas.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pdf-consulta',
  templateUrl: './pdf-consulta.component.html',
  styles: [
  ]
})
export class PdfConsultaComponent implements OnInit {

  public consulta: any = {
    motivoConsulta: '',
    tratamiento: '',
    evolucion: '',
    paciente: '',
    usuario: ''
  };

  constructor(private consultaService: ConsultasService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({id}) => {
      console.log(id);
      this.consultasIdPDF(id);
    });
  }


  consultasIdPDF(id: string){
    this.consultaService.cargarConsultaId(id)
    .subscribe( evaluacionPaciente => {
      // console.log(evaluacionPaciente);
      this.consulta = evaluacionPaciente;
    }, error => {
      console.log('Error al cargar');  
    })
  }
}
