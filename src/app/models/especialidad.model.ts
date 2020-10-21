
interface _EspecialidadUser{
    _id: string;
    nombre1: string;
    apellido1: string;
    email: string;
}


export class Especialidad {
    constructor(

        public name: string,
        public usuario?: _EspecialidadUser,
        public _id?: string,

    ) {

    }
}