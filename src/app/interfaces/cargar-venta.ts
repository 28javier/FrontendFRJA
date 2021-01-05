import { VentaM } from '../models/venta.model';


export interface CargarVentaI {
    totalVentas: number;
    venta: VentaM[];
}