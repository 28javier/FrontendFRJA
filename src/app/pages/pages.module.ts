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
import { RegistroProductoComponent } from './producto/registro-producto/registro-producto.component';
import { PipesModule } from '../pipes/pipes.module';
import { RegistroPacienteComponent } from './paciente/registro-paciente/registro-paciente.component';
import { DatosGeneralesComponent } from './usuario/datos-generales/datos-generales.component';
import { UpdateUsuarioComponent } from './usuario/update-usuario/update-usuario.component';

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
    PerfilComponent,
    RegistroProductoComponent,
    RegistroPacienteComponent,
    DatosGeneralesComponent,
    UpdateUsuarioComponent,
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
    PerfilComponent,
    RegistroProductoComponent,
    RegistroPacienteComponent,
    DatosGeneralesComponent,
    UpdateUsuarioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    PipesModule
  ]
})
export class PagesModule { }
