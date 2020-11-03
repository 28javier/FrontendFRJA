import { Categoria } from './categoria.model';

// tslint:disable-next-line: class-name
interface _ProductoUser{
    id: string;
    nombre1: string;
    apellido1: string;
    email: string;
}


export class Producto {
    constructor(
        public codigoProducto: string,
        public nombreProducto: string,
        public stockProducto: number,
        public precioProducto: number,
        public descripcionProducto: string,
        public categoria?: Categoria,
        public usuario?: _ProductoUser,
        public img?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,

    ) {

    }
}