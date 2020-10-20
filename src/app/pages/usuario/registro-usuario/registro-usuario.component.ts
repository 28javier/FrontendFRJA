import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styles: [
  ]
})
export class RegistroUsuarioComponent {

  public formSubmitted = false;
  public registroForms = this.fb.group({
    nombre1: ['', [Validators.required, Validators.minLength(3)]],
    nombre2: ['', [Validators.required, Validators.minLength(3)]],
    apellido1: ['', [Validators.required, Validators.minLength(3)]],
    apellido2: ['', [Validators.required, Validators.minLength(3)]],
    role: [''],
    especialidad: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['1234567', [Validators.required]]
  }, {
    validators: this.passwordIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder) {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registroForms.value);
    if (this.registroForms.valid) {
      console.log('Formulario Posteado');
    } else {
      console.log('Formulario Incorecto !!!');
    }
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
          pass2Control.setErrors(null)
        }else{
          pass2Control.setErrors({noEsIgual: true});
        }
    }
  }
}
