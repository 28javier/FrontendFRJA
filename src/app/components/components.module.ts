import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ModalImagenComponent],
  exports:[ModalImagenComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ComponentsModule { }
