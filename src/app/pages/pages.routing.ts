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


const routes: Routes = [

    {path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
     {path: '', component: DashboardComponent, data: {titulo: 'Dasboard'}},
     {path: 'usuario', component: UsuarioComponent, data: {titulo: 'Usuarios'}},
     {path: 'paciente', component: PacienteComponent, data: {titulo: 'Pacientes'}},
     {path: 'categoria', component: CategoriaComponent, data: {titulo: 'Categorias'}},
     {path: 'producto', component: ProductoComponent, data: {titulo: 'Productos'}},
     {path: 'account-settings', component: AccountSetingsComponent, data: {titulo: 'Ajustes de Cuenta'}},
     {path: 'registro-Usuario', component: RegistroUsuarioComponent, data: {titulo: 'Registro Usuario'}},
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
