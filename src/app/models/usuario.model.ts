import { environment } from '../../environments/environment';

const base_url = environment.base_url;


// tslint:disable-next-line: class-name
interface _EspecialidadU {
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
        public especialidad?: _EspecialidadU,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public img?: string
    ) {
    }
    // imprimirUsuario(){
    //     console.log(this.email);
    // }

    // {{url}}upload/usuarios/jinjk
    get imagenUrl(){
        // console.log(this.img);
        if (!this.img) {
            return `${base_url}/upload/usuarios/no-img`;
        } else if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-img`;
        }
    }
} 