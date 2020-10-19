
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// ruta hija
import { LoginComponent } from './login/login.component';


const routes: Routes = [

    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
