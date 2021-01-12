import { Paciente } from './paciente.model';


interface _ConsultaUser{
    id: string;
    nombre1: string;
    nombre2: string;
    apellido1: string;
    apellido2: string;
    email: string;
}


export class ConsultaM {
    constructor(
        
        public fechaEvolucion: string,
        public motivoConsulta?:  String,
        public tratamiento?: String,
        public evolucion?:  String,
        public usuario?: _ConsultaUser,
        public paciente?: Paciente,
        // tslint:disable-next-line: variable-name
        public _id?: string,

    ) {

    }
}