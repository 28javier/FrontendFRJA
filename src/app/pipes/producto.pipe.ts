import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'producto'
})
export class ProductoPipe implements PipeTransform {


  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultProducto = [];
    for(const producto of value ){
      if (producto.nombreProducto.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        // console.log('sipp');
        resultProducto.push(producto);
      };
    };
    return resultProducto;
  }

}
