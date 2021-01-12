import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // public menuItems: any[];
  public usuario: Usuario;

  constructor( public sidebarService: SidebarService,
               private usuarioServices: UsuarioService) {
    // this.menuItems = sidebarService.menu;
    this.usuario = usuarioServices.usuario;
    // console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

  logoutSidebar(){
    this.usuarioServices.logout();
  }

}
