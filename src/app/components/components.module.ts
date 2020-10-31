import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';



@NgModule({
  declarations: [ModalImagenComponent,
    CrearCategoriaComponent
    ],
  exports:[ ModalImagenComponent,
    CrearCategoriaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
