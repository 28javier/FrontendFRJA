import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// Componentes de las paginas principales
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PagesComponent } from './pages.component';




@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    ProductoComponent,
    CategoriaComponent,
    PacienteComponent,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    UsuarioComponent,
    ProductoComponent,
    CategoriaComponent,
    PacienteComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
