import { Paciente } from './paciente.model';



interface _VentaUser{
    id: string;
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    email: string;
}


export class VentaM {
    constructor(
        public fecha: string,
        public usuario?: _VentaUser,
        public paciente?: Paciente,
        // tslint:disable-next-line: variable-name
        public _id?: string,

    ) {

    }
}