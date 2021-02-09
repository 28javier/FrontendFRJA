import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from '../../../services/consultas.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-consulta-detalle',
  templateUrl: './consulta-detalle.component.html',
  styles: [
  ]
})
export class ConsultaDetalleComponent implements OnInit {

  // public consultaForms: FormGroup;
  public id;
  public consulta: any = {
    motivoConsulta: '',
    tratamiento: '',
    evolucion: '',
    paciente: '',
    usuario: ''
  };

  // @ViewChild('content') content: ElementRef;

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

  descargarPdf(){
   
    const options = {
      filename: 'FRJ_file.pdf',
      image: {type: 'jpeg'},
      htmlcanvas: {},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }; 
    const content: Element = document.getElementById('content');
    html2pdf()
    .from(content)
    .set(options)
    .save();
  }
}
