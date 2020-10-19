import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { PacienteComponent } from './paciente/paciente.component';
import { AccountSetingsComponent } from './account-setings/account-setings.component';


const routes: Routes = [

    {path: 'dashboard',
    component: PagesComponent,
    children: [
     {path: '', component: DashboardComponent, data: {titulo: 'Dasboard'}},
     {path: 'usuario', component: UsuarioComponent, data: {titulo: 'Usuarios'}},
     {path: 'paciente', component: PacienteComponent, data: {titulo: 'Pacientes'}},
     {path: 'categoria', component: CategoriaComponent, data: {titulo: 'Categorias'}},
     {path: 'producto', component: ProductoComponent, data: {titulo: 'Productos'}},
     {path: 'account-settings', component: AccountSetingsComponent, data: {titulo: 'Ajustes de Cuenta'}}
    ]
   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
