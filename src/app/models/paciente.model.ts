import { Usuario } from 'src/app/models/usuario.model';

export class Paciente {
    constructor(
        public nombreP: string,
        public nombreP2: string,
        public apellidoP: string,
        public apellidoP2: string,
        public cedulaP: number,
        public sexoP?: string,
        public edadP?: number,
        public fechaNacimientoP?: Date,
        public estadoCivilP?: string,
        public tipoDeSangreP?: string,
        // public numeroDiscapcidadP?: string,
        public direccionesP?: string,
        public direccionesP1?: string,
        public celularesP?: string,
        public celularesP1?: string,
        public usuario?: Usuario,
        // tslint:disable-next-line: variable-name
        public _id?: string,
    ) {
    }
}
