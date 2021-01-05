import { Producto } from '../models/producto.model';



export interface CargarProductoI {
    totalProductos: number;
    producto: Producto[];
    stockProducto: any;
}