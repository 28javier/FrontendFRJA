import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PacienteService } from '../../../services/paciente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../models/paciente.model';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styles: [
  ]
})
export class RegistroPacienteComponent implements OnInit {

  public pacienteForm: FormGroup;
  public pacientes: Paciente[] = [];
  public pacienteSeleccionado: Paciente;

  constructor(private fb: FormBuilder,
              private pacienteService: PacienteService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({id}) => {
      // console.log(id);
      this.cargarPacienteID(id);
    });

    this.pacienteForm = this.fb.group({
       nombreP:            [' ', [Validators.required]],
       nombreP2:           [' ', [Validators.required]],
       apellidoP:          [' ', [Validators.required]],
       apellidoP2:         [' ', [Validators.required]],
       cedulaP:            [' ' , [Validators.minLength(10)]],
       sexoP:              [' ', ],
       edadP:              [' ', ],
       fechaNacimientoP:   [' ', ],
       estadoCivilP:       [' ', ],
       tipoDeSangreP:      [' ', ],
       direccionesP:       [' ', ],
       direccionesP1:      [' ', ],
       celularesP:         [' ' , [Validators.minLength(10)]],
       celularesP1:        [' ' , [Validators.minLength(10)]]
    });
  }



  cargarPacienteID(id: string){
    if (id === 'nuevo') {
      return;
    }
    this.pacienteService.cargarPacienteId(id)
    .subscribe(paciente => {
      if (!paciente) {
        return this.router.navigateByUrl(`/dashboard/paciente`);
      }
      const {nombreP, nombreP2, apellidoP, apellidoP2, cedulaP, sexoP, edadP,
      fechaNacimientoP, estadoCivilP, tipoDeSangreP,   direccionesP, direccionesP1,
      celularesP, celularesP1} = paciente;
      console.log(nombreP, nombreP2, apellidoP, apellidoP2, cedulaP, sexoP, edadP,
        fechaNacimientoP, estadoCivilP, tipoDeSangreP, direccionesP, direccionesP1,
      celularesP, celularesP1);
      this.pacienteSeleccionado = paciente;
      this.pacienteForm.setValue({nombreP, nombreP2, apellidoP, apellidoP2, cedulaP, sexoP, edadP,
        fechaNacimientoP, estadoCivilP, tipoDeSangreP, direccionesP, direccionesP1,
      celularesP, celularesP1});
    });
  }

  guardarPaciente(): void {
    const {nombreP2, apellidoP, apellidoP2} = this.pacienteForm.value;
    // console.log(this.pacienteForm.value);
    if (this.pacienteSeleccionado) {
      const data = {
        ...this.pacienteForm.value,
        _id: this.pacienteSeleccionado._id
      }
      this.pacienteService.editarPaciente(data)
      .subscribe(resp => {
        console.log(resp);
        Swal.fire('Paciente Actualizado', `${nombreP2} ${apellidoP} ${apellidoP2} </br> actualizado Correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/paciente`);
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error');
      });
    } else {
      this.pacienteService.crearPaciente(this.pacienteForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Paciente Creado', `${nombreP2} ${apellidoP} ${apellidoP2} </br> creado Correctamente`, 'success');
          // this.router.navigateByUrl(`/dashboard/registro-producto/${resp.producto._id}`);
        this.router.navigateByUrl(`/dashboard/paciente`);
        }, (err) => {
          Swal.fire('Error', err.error.message, 'error');
        });
    }
  }
}
