import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { Especialidad } from '../../models/especialidad.model';
import { EspecialidadService } from '../../services/especialidad.service';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { ConsultasService } from '../../services/consultas.service';
import { ConsultaM } from '../../models/consulta.model';
import { VentaM } from '../../models/venta.model';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public pacientes: Paciente[] = [];
  public categorias: Categoria[] = [];
  public especialidades: Especialidad[] = [];
  public productos: Producto[] = [];
  public evaluacionPacientes: any[] = [];
  public ventas: VentaM[] = [];

  constructor(private usuarioServices: UsuarioService,
    private pacienteService: PacienteService,
    private categoriaService: CategoriaService,
    private especialidadService: EspecialidadService,
    private productoService: ProductoService,
    private consultaService: ConsultasService,
    private ventasService: VentasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarPacientes();
    this.CargarCategoria();
    this.CargarEspecialidad();
    this.cargarProductos();
    this.cargarConsulta();
    this.cargarVentas();
  }

  cargarUsuarios() {
    this.usuarioServices.cargarUsuarios()
    .subscribe( ({totalUsuario, usuarios}) => {
      // console.log(usuarios);
        this.usuarios = usuarios;
    });
  }

  cargarVentas(){
    this.ventasService.cargarVentas()
    .subscribe((resp) => {
        this.ventas = resp;
    })
  }

  cargarPacientes(){
    this.pacienteService.cargarPacientesPa()
    .subscribe( ({paciente}) => {
      // console.log(usuarios);
        this.pacientes = paciente;
    });  
  }

  cargarConsulta(){
    this.consultaService.cargarPacientesPa()
    .subscribe(({evaluacionPaciente}) => {
      this.evaluacionPacientes = evaluacionPaciente;
    })
  }
  CargarEspecialidad(){
    this.especialidadService.cargarEspecialidades()
    .subscribe((resp)=>{
      this.especialidades = resp;
    })
  }

  cargarProductos(){
    this.productoService.cargarProductos()
    .subscribe((resp) => {
      this.productos = resp;
    })
  }

  CargarCategoria() {
    this.categoriaService.cargarCategorias()
    .subscribe( (resp) => {
        this.categorias = resp;
    });
  }


}
