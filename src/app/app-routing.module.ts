import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importacion del modulo de rutas hijas
import { PagesRoutingModule } from './pages/pages.routing';
import {  AuthRoutingModule } from './auth/auth.routing';

// Importacion de modulos componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
// path: '/dashboard', PagesRoutingModule
// path: '/auth', AuthRoutingModule
  {path: '**', component: NopagefoundComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
