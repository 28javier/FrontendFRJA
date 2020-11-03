import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styles: [
  ]
})
export class CrearCategoriaComponent implements OnInit {


  public formSubmitted = false;
  public categoriaForms = this.fb.group({
      nombreCategoria: ['', [Validators.required, Validators.minLength(3)]],
      descripcionCategoria: [''],
  });


  constructor(public categoriaService: CategoriaService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

     // metodo cerrar modal
     cerrarModal() {
      this.categoriaService.cerrarModal();
    }

    crearCategoria(){
      this.formSubmitted = true;
      // console.log(this.categoriaForms.value);
      if (this.categoriaForms.invalid) {
        // console.log('posteado');
        return;
      }
      // realizar guardado
      this.categoriaService.crearCategoria(this.categoriaForms.value)
      .subscribe(resp => {
          console.log('categoria Creada');
          this.categoriaForms.reset();
          Swal.fire('Creado', 'Categoria Creada correctamente', 'success');
          this.categoriaService.cargaCategoria.emit();
          this.categoriaService.cerrarModal();
        }, (err) => {
          Swal.fire('Error', err.error.message, 'error');
          this.categoriaService.cerrarModal();
        });
    }

    // validaciones de los campos
    campoNoValido(campo: string): boolean {
      if (this.categoriaForms.get(campo).invalid && this.formSubmitted) {
        return true;
      } else {
        return false;
      }
    }
}
