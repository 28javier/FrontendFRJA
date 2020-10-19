import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProductoComponent } from './producto/producto.component';
import { PacienteComponent } from './paciente/paciente.component';


const routes: Routes = [

    {path: 'dashboard',
    component: PagesComponent,
    children: [
     {path: '', component: DashboardComponent},
     {path: 'categoria', component: CategoriaComponent},
     {path: 'usuario', component: UsuarioComponent},
     {path: 'producto', component: ProductoComponent},
     {path: 'paciente', component: PacienteComponent},
    ]
   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
