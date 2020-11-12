import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styles: [
  ]
})
export class DatosGeneralesComponent implements OnInit {

  public usuarioId: Usuario;
  constructor(private usuarioService: UsuarioService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({id}) => {
      // console.log(id);
      this.obtenerUusarioId(id);
    });
  }

  obtenerUusarioId(id: string){
    this.usuarioService.obtenerUsuarioID(id)
    .subscribe(usuario => {
      console.log(usuario);
      // const {nombre1, nombre2, apellido1, apellido2,
      //   role, especialidad: { _id}, img} = usuario;
      this.usuarioId = usuario;
    });
  }
}
