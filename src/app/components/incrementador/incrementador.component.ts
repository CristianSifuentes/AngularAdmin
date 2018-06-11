import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { 

    //console.log('Leyenda ', this.leyenda);
    //console.log('Progreso ', this.progreso);
  }

  ngOnInit() {
   // console.log('Leyenda ', this.leyenda);
   //console.log('Progreso ', this.progreso);

  }

  onChange(newValue: number){
     console.log(newValue);
     if(newValue >= 100){
      this.progreso = 100;
     }else if(newValue <= 0){
      this.progreso = 0;
     } else {
       this.progreso = newValue;
     }
     this.cambioValor.emit(this.progreso);

  }

  cambiar(valor: number){
    if(this.progreso >=100 && valor > 0){
      this.progreso = 100;
      return;
    }
    if(this.progreso <=0 && valor > 0){
      this.progreso = 0;
      return;
    }
     this.progreso = this.progreso + valor;
     this.cambioValor.emit(this.progreso);
  }

}
