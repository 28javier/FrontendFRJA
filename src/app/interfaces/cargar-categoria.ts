import { Categoria } from '../models/categoria.model';


export interface CargarCategoria {
    totalCategoria: number;
    categoria: Categoria[];
}