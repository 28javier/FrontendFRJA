import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from 'src/app/models/paciente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConsultasService } from '../../../services/consultas.service';

@Component({
  selector: 'app-consulta-create',
  templateUrl: './consulta-create.component.html',
  styles: [
  ]
})
export class ConsultaCreateComponent implements OnInit {

  public usuario: Usuario;
  public pacientes: Paciente[] = [];
  public consultaForms: FormGroup;
  public formSubmitted = false;


  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private pacienteService: PacienteService,
              private consultaService: ConsultasService,
              public router: Router) { 
    this.usuario = this.usuarioService.usuario;
    // console.log(this.usuario);
  }

  ngOnInit(): void {
    this.cargarPacientes();

    this.consultaForms = this.fb.group({
      motivoConsulta:['', [Validators.required]] ,
      tratamiento: [''],
      evolucion: [''],
      paciente: ['', [Validators.required]],
      // usuario: [this.usuario.email, Validators.required]
    });
  }

  crearConsulta(){
    // console.log(this.consultaForms.value);
    this.formSubmitted = true;
    if (this.consultaForms.invalid) {
      return ;
  }
  this.consultaService.crearConsulta(this.consultaForms.value)
      .subscribe((resp) => {
        // console.log('consulta creado');
        // console.log(resp);
        Swal.fire('Consulta', 'Creada Correctamente', 'success');
        this.router.navigateByUrl(`/dashboard/consultas`);
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error');
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.consultaForms.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  cargarPacientes() {
    this.pacienteService.cargarPacientes().subscribe(
      pacientes => {
        this.pacientes = pacientes;
        // console.log(pacientes);
      },
      erro => {console.log(erro); }
    );
  }

}
