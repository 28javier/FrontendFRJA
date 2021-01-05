import { VentaM } from "./venta.model";

export class DetalleVentaM {
    constructor(
        // tslint:disable-next-line: variable-name
        public idproducto: string,
        public _id: string,
        public cantidad: number,
        
    ) {

    }
}