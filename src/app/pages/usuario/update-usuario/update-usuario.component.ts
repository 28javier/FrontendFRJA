import { Component, OnInit } from '@angular/core';
import { Especialidad } from '../../../models/especialidad.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { FechaI } from '../../../interfaces/fecha.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { EspecialidadService } from '../../../services/especialidad.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styles: [
  ]
})
export class UpdateUsuarioComponent implements OnInit {

  public especialidades: Especialidad[] = [];
  public cargando: boolean = true;
  public formSubmitted = false;
  public registroForms: FormGroup;
  public usuarioSelecionado: Usuario;
  public fechaI: FechaI;


  constructor( private fb: FormBuilder, public usuarioServices: UsuarioService,
               public especialidadService: EspecialidadService,
               public router: Router,
               private activateRoute: ActivatedRoute) {
                // this.usuario = usuarioServices.usuario;
               }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({id}) => {
      // console.log(id);
      this.CargarUsuario(id);
    });
    this.cargarEspecialidades();
    this.registroForms = this.fb.group({
      nombre1: ['', [Validators.required]],
      nombre2: ['', [Validators.required]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      direccion1: [''],
      direccion2: [''],
      celular1: [''],
      celular2: [''],
      fechaNacimiento: [''],
      estadoCivil: ['', [Validators.required]],
      tipoDeSangre: ['', [Validators.required]],
      sexo: ['', [Validators.required]]
    });
  }

  CargarUsuario(id: string) {
    this.usuarioServices.obtenerUsuarioID(id)
    .subscribe(usuario => {
      if (!usuario) {
        return this.router.navigateByUrl(`/dashboard/usuario`);
      }
      // console.log(usuario);
      const {nombre1, nombre2, apellido1, apellido2, direccion1, direccion2, celular1, celular2,
        fechaNacimiento, estadoCivil, sexo, cedula, tipoDeSangre, email, role, especialidad: { _id}} = usuario;
      // console.log(codigoProducto, nombreProducto, stockProducto, precioProducto,
      //   descripcionProducto, _id);
      this.usuarioSelecionado = usuario;
      this.registroForms.setValue({nombre1, nombre2, apellido1, apellido2, direccion1, direccion2, celular1, celular2,
        fechaNacimiento, estadoCivil, sexo, cedula, tipoDeSangre, email, role, especialidad: _id});
    });
  }

  updateUsuario() {
      const data = {
        ...this.registroForms.value,
          _id: this.usuarioSelecionado._id
      }
      this.usuarioServices.actualizarPerfil2(data)
    .subscribe((resp) => {
      // console.log(resp);
      Swal.fire('Actualizado', 'Actualizado correctamente', 'success');
      this.router.navigateByUrl(`/dashboard/usuario`);
    },(err) => {
      Swal.fire('Error', err.error.message, 'error');
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

  campoNoValido(campo: string): boolean {
    if (this.registroForms.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

}
