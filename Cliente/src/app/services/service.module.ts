import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
SettingService, SharedService, SidebarService, UsuarioService
} from './services.index';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [
    SettingService,SharedService,SidebarService, UsuarioService
  ],
  declarations: []
})
export class ServiceModule { }
