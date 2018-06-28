import { Component, OnInit, Inject } from '@angular/core';
import { SettingService } from './../../services/setting.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  constructor( public _ajustes: SettingService) { }

  ngOnInit() {
    this.colocarCheck();
  }
  cambiarColor(tema: string, link: any){
    console.log(link);
    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);
   
  }

  aplicarCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores){
      console.log(ref);
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores){
      let tema = this._ajustes.ajustes.tema;
       if(ref.getAttribute('data-theme') === tema){
          ref.classList.add('working');
          break;
       }
    }
    
  }

}
