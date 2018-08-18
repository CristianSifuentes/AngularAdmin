import { Usuario } from './../models/usuario.model';
import { UsuarioService } from '../services/services.index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins(); 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email : string;
  constructor(
    public router: Router, 
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
     this.email = localStorage.getItem('email') || '';
  }

  ingresar(forma: NgForm){
    console.log(forma.valid);
    console.log(forma.value);

     
    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.loginUsuario(usuario, forma.value.recuerdame)
       .subscribe(
         correcto => this.router.navigate(['/dashboard']));
  }

}
