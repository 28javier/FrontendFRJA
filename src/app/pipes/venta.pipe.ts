import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'venta'
})
export class VentaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultVenta = [];
    for(const venta of value ){
      if (venta.paciente.apellidoP.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        // console.log('sipp');
        resultVenta.push(venta);
      };
    };
    return resultVenta;
  }

}
