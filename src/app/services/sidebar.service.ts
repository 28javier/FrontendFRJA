import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
    // if (this.menu.length === 0) {
      
    // }
  }

  // menu: any [] = [
  //   {
  //     titulo: 'Usuarios',
  //     icono: 'mdi mdi-account-multiple',
  //     submenu: [
  //       { titulo: 'Usuario', url: 'usuario'},
  //       // { titulo: 'Dashboard', url: '/'}
  //   ]
  //   },
  //   {
  //     titulo: 'Especialidades',
  //     icono: 'mdi mdi-clipboard-account',
  //     submenu: [
  //       { titulo: 'Especialidad', url: 'especialidad'},
  //       // { titulo: 'Dashboard', url: '/'}
  //   ]
  //   },
  //   {
  //     titulo: 'Pacientes',
  //     icono: 'mdi mdi-wheelchair-accessibility',
  //     submenu: [
  //       { titulo: 'Pacientes', url: 'paciente'},
  //       // { titulo: 'Consultas', url: 'paciente'},
  //       // { titulo: 'Dashboard', url: '/'}
  //   ]
  //   },

  //   {
  //     titulo: 'Consultas',
  //     icono: 'mdi mdi-book-open-page-variant',
  //     submenu: [
  //       { titulo: 'Consultas Médicas', url: 'consultas'},
  //       // { titulo: 'Consultas', url: 'paciente'},
  //       // { titulo: 'Dashboard', url: '/'}
  //   ]
  //   },

  //   {
  //     titulo: 'Categorias',
  //     icono: 'mdi mdi-folder',
  //     submenu: [
  //       { titulo: 'Categoria', url: 'categoria'},
  //       // { titulo: 'Dashboard', url: '/'}
  //   ]
  //   },
  //   {
  //     titulo: 'Productos',
  //     icono: 'mdi mdi-clipboard-text',
  //     submenu: [
  //       { titulo: 'Producto', url: 'producto'},
  //       // { titulo: 'Dashboard', url: '/'}
  //   ]
  //   },
  //   {
  //     titulo: 'Ventas',
  //     icono: 'mdi mdi-cash-multiple',
  //     submenu: [
  //       { titulo: 'Venta', url: 'venta'},
  //       // { titulo: 'Dashboard', url: '/'}
  //   ]
  //   }
  // ];

 
}
