import { Paciente } from '../models/paciente.model';
import { Usuario } from '../models/usuario.model';


export interface CargarConsultasI {
    totalEvaluaciones: number;
    evaluacionPaciente: Paciente[];
    usuario: Usuario;
}