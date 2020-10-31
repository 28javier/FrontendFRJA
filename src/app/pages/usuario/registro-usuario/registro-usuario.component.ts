import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';


import { Especialidad } from '../../../models/especialidad.model';
import { EspecialidadService } from '../../../services/especialidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styles: [
  ]
})
export class RegistroUsuarioComponent implements OnInit{

  public especialidades: Especialidad[] = [];
  public cargando: boolean = true;



  public formSubmitted = false;
  public registroForms = this.fb.group({
    nombre1: ['', [Validators.required, Validators.minLength(3)]],
    nombre2: ['', [Validators.required, Validators.minLength(3)]],
    apellido1: ['', [Validators.required, Validators.minLength(3)]],
    apellido2: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', [Validators.required]],
    especialidad: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]]
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder, public usuarioServices: UsuarioService,
               public especialidadService: EspecialidadService) {
  }

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

  crearUsuario() {
    this.formSubmitted = true;
    // console.log(this.registroForms.value);
    if (this.registroForms.invalid) {
        return ;
      //  si era valid ojo console.log('Formulario Posteado');
    }
    // else {
    //   console.log('Formulario Incorecto !!!');
    // }
    // realizamos el posteo del formulario del servicio
    this.usuarioServices.crearUsuario(this.registroForms.value)
        .subscribe((resp) => {
          console.log('usuario creado');
          // console.log(resp);
          this.registroForms.reset();
          Swal.fire('Usuario Creado', resp.message, 'success');
          

        }, (err) => {
          Swal.fire('Error', err.error.message, 'error');
        });
  }

  campoNoValido(campo: string): boolean {
    if (this.registroForms.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
     const pass1 = this.registroForms.get('password').value;
     const pass2 = this.registroForms.get('password2').value;

     if ((pass1 !== pass2) && this.formSubmitted)  {
       return true;
     } else {
       return false;
     }
  }

  passwordIguales(pass1Name: string, pass2Name: string) {
    return ( formGroup: FormGroup)=>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
          pass2Control.setErrors(null);
        }else{
          pass2Control.setErrors({noEsIgual: true});
        }
    }
  }
}
