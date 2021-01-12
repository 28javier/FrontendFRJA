import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultConsulta = [];
    for(const eva of value ){
      if (eva.paciente.apellidoP.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        // console.log('sipp');
        resultConsulta.push(eva);
      };
    };
    return resultConsulta;
  }
}
