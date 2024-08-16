import { Component, model } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { Sessao } from 'src/app/tipos';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButton,
    FormsModule,
    MatCheckboxModule,
    CommonModule,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  cadastro: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    cadastro: new FormControl(false, Validators.required),
  });

  constructor(private sessaoServico: SessaoService, private router: Router) {}

  submeter() {
    const formData = new FormData();

    formData.append('email', this.loginForm.get('email')?.value ?? '');
    formData.append('senha', this.loginForm.get('senha')?.value ?? '');

    this.sessaoServico.login(formData).subscribe({
      next: (data: Sessao) => {
        this.sessaoServico.salvarSessao(data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
