import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { UploadFileService } from '../../services/upload-file.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForms: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private uploadFileServices: UploadFileService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForms = this.fb.group({
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    // console.log(this.perfilForms.value);
    this.usuarioService.actualizarPerfil(this.perfilForms.value)
      .subscribe((resp) => {
        const {email} = this.perfilForms.value;
        this.usuario.email = email;
        // console.log(resp);
        Swal.fire('Guardado', 'Guardado correctamente', 'success');
      },(err) => {
        Swal.fire('Error', err.error.message, 'error');
      });
  }

  cambiarImagen(file: File) {
  //   console.log(file);
  this.imagenSubir = file;
  if (!file) {
    return this.imgTemp = null;
  }
  const reader = new FileReader();
   reader.readAsDataURL(file);

  reader.onloadend = () => {
    this.imgTemp = reader.result;
    // console.log(reader.result);
  }
  }

  subirImagen(){
    this.uploadFileServices.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario._id)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Actualizado', 'Imagen Cambiada', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error');
      });
  }

}
