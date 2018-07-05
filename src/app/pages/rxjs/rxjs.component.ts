import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor(
    
  ) { 
     

     this.regresaObservable().pipe(
       retry(2)
     ).subscribe(
       numero => console.log('Subs', numero),
       error => console.log('Error en el obs', error),
       () => console.log('El observador termino!')
      );

  }

  ngOnInit() {
  }

  regresaObservable(): Observable<number> {
    return  new Observable( observer => {

      let contador = 0;
      let intervalo = setInterval(() => {
            contador +=1;
             observer.next(  contador );

              if(contador === 3){
                  clearInterval(intervalo);
                  observer.complete();
              }
              if(contador === 2){
                clearInterval(intervalo);
                observer.error('Auxilio');
              }
      }, 1000);
     });

  }

}
