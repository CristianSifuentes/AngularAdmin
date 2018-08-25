import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient
  ) { 
    this.cargarStorage();

  }

  estaLogeado(){
     return (this.token.length > 5) ? true: false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario =  JSON.parse(localStorage.getItem('usuaro'));
    }else{
      this.usuario = null;
      this.token = '';
    }
  }



  guardarStorage(id: string, token: string, usuario: Usuario){
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;
  }

  loginGoogle(token: string){
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token })
         .map( (resp: any) => {
           this.guardarStorage(resp.id, resp.token, resp.usuario);
           return true;
         });
  }

  loginUsuario(usuario: Usuario, recordar: boolean = false){
     
    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    
    
    let url = URL_SERVICIOS + '/login';
     return this.http.post(url, usuario ).map((resp: any) => {
             this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
     });
  }


  crearUsuario(usuario: Usuario){
      let url = URL_SERVICIOS + '/usuario';

      return this.http.post(url, usuario).map(( resp: any) => {
           
        swal('Usuario creado', usuario.email, 'succes');
        return resp.usuario;
      });
  }


  
}
