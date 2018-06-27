import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  cambiarColor(tema: string){
    console.log(tema);
  }

}
