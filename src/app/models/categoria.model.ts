
interface _CategoriaUser{
    id: string;
    nombre1: string;
    apellido1: string;
    email: string;
}
export class Categoria {
    constructor(

        public nombreCategoria: string,
        public descripcionCategoria: string,
        public usuario?: _CategoriaUser,
        public _id?: string,

    ) {

    }
}