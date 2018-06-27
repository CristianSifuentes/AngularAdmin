import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document) { }

  ngOnInit() {

  }
  cambiarColor(tema: string){
    console.log(tema);
    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href',url );

  }

}
