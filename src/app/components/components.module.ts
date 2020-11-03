import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { ModalActualizarCategoriaComponent } from './modal-actualizar-categoria/modal-actualizar-categoria.component';



@NgModule({
  declarations: [ModalImagenComponent,
    CrearCategoriaComponent,
    ModalActualizarCategoriaComponent,
    

    ],
  exports: [ ModalImagenComponent,
    CrearCategoriaComponent,
    ModalActualizarCategoriaComponent,

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
