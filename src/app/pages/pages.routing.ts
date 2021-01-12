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
import { UpdateUsuarioComponent } from './usuario/update-usuario/update-usuario.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentasCreateComponent } from './ventas/ventas-create/ventas-create.component';
import { VentasDetalleComponent } from './ventas/ventas-detalle/ventas-detalle.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaCreateComponent } from './consultas/consulta-create/consulta-create.component';
import { ConsultaDetalleComponent } from './consultas/consulta-detalle/consulta-detalle.component';


const routes: Routes = [

    {path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
     {path: '', component: DashboardComponent, data: {titulo: 'Dasboard'}},
     {path: 'usuario', component: UsuarioComponent, data: {titulo: 'Mantenimiento Usuarios'}},
     {path: 'usuarios', component: RegistroUsuarioComponent, data: {titulo: 'Mantenimiento Usuarios Registrar'}},
     {path: 'update-Usuario/:id', component: UpdateUsuarioComponent, data: {titulo: 'Mantenimiento Usuarios Modificar'}},
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
     {path: 'venta', component: VentasComponent, data: {titulo: 'Mantenimiento de Ventas'}},
     {path: 'ventas', component: VentasCreateComponent, data: {titulo: 'Ventas de Productos'}},
     {path: 'venta/:id', component: VentasDetalleComponent, data: {titulo: 'Detalle de la Venta'}},

     {path: 'consultas', component: ConsultasComponent, data: {titulo: 'Mantenimiento de Consultas'}},
     {path: 'consultaRegistro', component: ConsultaCreateComponent, data: {titulo: 'Registro de la Consulta'}},
     {path: 'consultaDetalle/:id', component: ConsultaDetalleComponent, data: {titulo: 'Detalle de la Consulta'}},





    ]
   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
