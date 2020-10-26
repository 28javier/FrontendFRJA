import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Componentes de las paginas principales
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PagesComponent } from './pages.component';
import { AccountSetingsComponent } from './account-setings/account-setings.component';
import { RegistroUsuarioComponent } from './usuario/registro-usuario/registro-usuario.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    ProductoComponent,
    CategoriaComponent,
    PacienteComponent,
    PagesComponent,
    AccountSetingsComponent,
    RegistroUsuarioComponent,
    EspecialidadComponent,
    PerfilComponent
  ],
  exports: [
    DashboardComponent,
    UsuarioComponent,
    ProductoComponent,
    CategoriaComponent,
    PacienteComponent,
    PagesComponent,
    AccountSetingsComponent,
    RegistroUsuarioComponent,
    EspecialidadComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ]
})
export class PagesModule { }
