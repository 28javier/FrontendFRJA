import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ruta principal ver
import { AppRoutingModule } from './app-routing.module';

// Importacion del Modulo que compone las paginas principales
import { PagesModule } from './pages/pages.module';

// Importcacion del Modulo de auth para el modulo principal que es este
import { AuthModule } from './auth/auth.module';
// Importcacion del Modulo de la carpeta components para el modulo principal que es este
import { ComponentsModule } from './components/components.module';

// componentes
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ComponentsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
