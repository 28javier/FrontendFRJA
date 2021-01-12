import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { FilterPipe } from './filter.pipe';
import { VentaPipe } from './venta.pipe';
import { ProductoPipe } from './producto.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    FilterPipe,
    VentaPipe,
    ProductoPipe
  ],
  exports: [
    ImagenPipe,
    FilterPipe,
    VentaPipe,
    ProductoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
