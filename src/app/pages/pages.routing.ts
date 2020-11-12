import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { PacienteComponent } from './paciente/paciente.component';
import { AccountSetingsComponent } from './account-setings/account-setings.component';
import { RegistroUsuarioComponent } from './usuario/registro-usuario/registro-usuario.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroProductoComponent } from './producto/registro-producto/registro-producto.component';
import { RegistroPacienteComponent } from './paciente/registro-paciente/registro-paciente.component';
import { DatosGeneralesComponent } from './usuario/datos-generales/datos-generales.component';


const routes: Routes = [

    {path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
     {path: '', component: DashboardComponent, data: {titulo: 'Dasboard'}},
     {path: 'usuario', component: UsuarioComponent, data: {titulo: 'Mantenimiento Usuarios'}},
     {path: 'registro-Usuario/:id', component: RegistroUsuarioComponent, data: {titulo: 'Mantenimiento Usuarios'}},
     {path: 'Usuario-datoGenerales/:id', component: DatosGeneralesComponent, data: {titulo: 'Mantenimiento Usuarios'}},

     {path: 'paciente', component: PacienteComponent, data: {titulo: 'Mantenimiento Pacientes'}},
     {path: 'registro-paciente/:id', component: RegistroPacienteComponent, data: {titulo: 'Mantenimiento Pacientes'}},
     {path: 'categoria', component: CategoriaComponent, data: {titulo: 'Categorias'}},
     {path: 'producto', component: ProductoComponent, data: {titulo: 'Mantenimiento Productos'}},
    //  {path: 'registro-producto', component: RegistroProductoComponent, data: {titulo: 'Mantenimiento Productos'}},
     {path: 'registro-producto/:id', component: RegistroProductoComponent, data: {titulo: 'Mantenimiento Productos'}},
     {path: 'account-settings', component: AccountSetingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
     {path: 'especialidad', component: EspecialidadComponent, data: {titulo: 'Especialidad'}},
     {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de Usuario'}},
    ]
   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
