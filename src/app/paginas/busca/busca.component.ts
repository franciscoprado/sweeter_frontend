import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem, Postagens } from 'src/app/tipos';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
})
export class BuscaComponent {
  buscaForm = new FormGroup({
    busca: new FormControl('', Validators.required),
  });
  postagens: Postagem[] = [];
  semPostagens: boolean = false;

  constructor(public postagemServico: PostagemService) {}

  buscarTermo() {
    this.postagens = [];
    const termo: string = this.buscaForm.value.busca ?? '';

    if (!termo) return;

    this.postagemServico.buscarPostagens(termo).subscribe({
      next: (data: Postagens) => {
        this.postagens = data.postagens;
        this.semPostagens = false;
      },
      error: (err) => {
        console.error(err.message);
        this.semPostagens = true;
      },
    });
  }
}
