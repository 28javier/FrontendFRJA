import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public formSubmitted = false;
  public loginForms = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService) { }


  login(){
    return this.usuarioService.login(this.loginForms.value)
            .subscribe(resp => {
              if ( this.loginForms.get('remember').value ){ 
                localStorage.setItem('email', this.loginForms.get('email').value );
              } else {
                localStorage.removeItem('email');
              }
              // Navegar al Dashboard
              this.router.navigateByUrl('/');
            }, (err) => {
              Swal.fire('Error', err.error.message, 'error');
            });
  // console.log(this.loginForms.value);
    // this.router.navigateByUrl('/');
  }
}
