

interface _UsuarioEspecialidad {
    _id: string;
    name: string;
}

export class Usuario {

    constructor(
        public nombre1: string,
        public nombre2: string,
        public apellido1: string,
        public apellido2: string,
        public email: string,
        public password?: string,
        public role?: string,
        public especialidad?: _UsuarioEspecialidad,
        public _id?: string,
        public img?: string
    ) {
    }
}