import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-modal-actualizar-categoria',
  templateUrl: './modal-actualizar-categoria.component.html',
  styles: [
  ]
})
export class ModalActualizarCategoriaComponent implements OnInit {

  public formSubmitted = false;
  public categoriaForms = this.fb.group({
      nombreCategoria: ['', [Validators.required, Validators.minLength(3)]],
      descripcionCategoria: [''],
  });
  public categoria: Categoria;


  constructor(public categoriaService: CategoriaService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // metodo cerrar modal
  cerrarModal() {
    this.categoriaService.cerrarModalA();
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
