
interface _CategoriaUser{
    id: string;
    nombre1: string;
    apellido1: string;
    email: string;
}
export class Categoria {
    constructor(

        public name: string,
        public usuario?: _CategoriaUser,
        public _id?: string,

    ) {

    }
}