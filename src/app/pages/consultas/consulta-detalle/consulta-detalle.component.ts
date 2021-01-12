import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../../services/consultas.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Paciente } from '../../../models/paciente.model';
import { ConsultaM } from 'src/app/models/consulta.model';

@Component({
  selector: 'app-consulta-detalle',
  templateUrl: './consulta-detalle.component.html',
  styles: [
  ]
})
export class ConsultaDetalleComponent implements OnInit {

  // public consultaForms: FormGroup;
  public consulta: any = {
    motivoConsulta: '',
    tratamiento: '',
    evolucion: '',
    paciente: '',
    usuario: ''
  };

  constructor( private consultaService: ConsultasService,
                private activateRoute: ActivatedRoute,
                private fb: FormBuilder) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({id}) => {
      // console.log(id);
      this.consultasId(id);
    });

    // this.consultaForms = this.fb.group({
    //   motivoConsulta:['', [Validators.required]] ,
    //   tratamiento: [''],
    //   evolucion: [''],
    //   paciente: ['', [Validators.required]],
    //   // usuario: [this.usuario.email, Validators.required]
    // });
  }



  consultasId(id: string){
    this.consultaService.cargarConsultaId(id)
    .subscribe( evaluacionPaciente => {
      // console.log(evaluacionPaciente);
      this.consulta = evaluacionPaciente;
    }, error => {
      console.log('Error al cargar');
      
    })
  }

}
