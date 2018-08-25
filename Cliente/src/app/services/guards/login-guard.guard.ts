import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public _router: Router){

  }

  canActivate(){
    console.log('paso por el login guard');
    if(this._usuarioService.estaLogeado()){
       console.log('PASO EL GUARD'); 
          return true;
    }else{
      console.log('BLOQUEADO POR EL GUARD');
      this._router.navigate(['/login']);
      return false;
    }

  }
}
