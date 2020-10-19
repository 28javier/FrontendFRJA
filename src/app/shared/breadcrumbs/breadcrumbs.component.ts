import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSusb$: Subscription;
  constructor( private router: Router) {
     this.tituloSusb$ = this.getArgumentosRutas()
                         .subscribe(({titulo}) => {
                            this.titulo = titulo;
                            document.title = `Rostro de Jesús - ${titulo}`;
  });
  }

  getArgumentosRutas(){
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
      );
    }

    ngOnDestroy(): void {
      this.tituloSusb$.unsubscribe();
    }


}
