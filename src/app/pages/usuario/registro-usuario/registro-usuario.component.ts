import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';


import { Especialidad } from '../../../models/especialidad.model';
import { EspecialidadService } from '../../../services/especialidad.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

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
  public registroForms: FormGroup;
  public usuarioSelecionado: Usuario;


  constructor( private fb: FormBuilder, public usuarioServices: UsuarioService,
               public especialidadService: EspecialidadService,
               public router: Router,
               private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({id}) => {
      console.log(id);
      // this.cargarUsuarioId(id);
    });
    this.cargarEspecialidades();
    this.registroForms = this.fb.group({
      nombre1: ['', [Validators.required, Validators.minLength(3)]],
      nombre2: ['', [Validators.required, Validators.minLength(3)]],
      apellido1: ['', [Validators.required, Validators.minLength(3)]],
      apellido2: ['', [Validators.required, Validators.minLength(3)]],
      role: ['1', [Validators.required]],
      especialidad: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    }, {
      validators: this.passwordIguales('password', 'password2')
    });
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
          Swal.fire('Usuario Creado', resp.message, 'success');
          this.router.navigateByUrl(`/dashboard/usuario`);
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

  // cargarUsuarioId(id: string) {
  //   if (id === 'nuevo') {
  //     return;
  //   }
  //   this.usuarioServices.obtenerUsuarioID(id)
  //   .subscribe(usuario => {
  //     console.log(usuario);
  //     const {nombre1, nombre2, apellido1, apellido2, role, especialidad: {_id}, email} = usuario;
  //     this.usuarioSelecionado = usuario;
  //     this.registroForms.setValue({
  //       nombre1, nombre2, apellido1, apellido2, role, especialidad: _id, email
  //     });
  //   });
  // }
}
