import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(private sessaoServico: SessaoService, private router: Router) {
    this.sessaoServico.limparSessao();
  }
}
