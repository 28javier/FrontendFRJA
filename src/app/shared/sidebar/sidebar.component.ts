import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private sidebarService: SidebarService,
               private usuarioServices: UsuarioService) {
    this.menuItems = sidebarService.menu;
    // console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

  logoutSidebar(){
    this.usuarioServices.logout();
  }

}
