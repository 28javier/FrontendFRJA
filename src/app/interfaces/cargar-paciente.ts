import { Paciente } from '../models/paciente.model';


export interface CargarPacienteI {
    TotalPaciente: number;
    paciente: Paciente[];
}