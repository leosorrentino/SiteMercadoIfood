import { Component, OnInit } from '@angular/core';
import { UserService } from '../userService';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu.user.component.html'
})
export class MenuUserComponent {

  saudacao: string;

  constructor(private userService: UserService) {  }

  userLogado(): boolean {
    var user = this.userService.obterUsuario();
    if (user) {
      this.saudacao = "Bem vindo ao IFoodMercado " + user.username;
      return true;
    }

    return false;
  }
}
