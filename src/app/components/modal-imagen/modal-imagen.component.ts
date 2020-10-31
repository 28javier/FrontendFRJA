import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public imagenSubir: File;
  public imgTemp: any = null;
  constructor( public modalImagenService: ModalImagenService,
               public uploadFileServices: UploadFileService ) { }

  ngOnInit(): void {
  }



  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    //   console.log(file);
    this.imagenSubir = file;
    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
  
    reader.onloadend = () => {
      this.imgTemp = reader.result;
      // console.log(reader.result);
    }
    }

    subirImagen(){
      const id = this.modalImagenService.id;
      const tipo = this.modalImagenService.tipo;
      this.uploadFileServices.actualizarFoto(this.imagenSubir, tipo, id)
        .then(img => {
          Swal.fire('Actualizado', 'Imagen Cambiada', 'success');
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        }, (err) => {
          Swal.fire('Error', err.error.message, 'error');
        });
    }

}
