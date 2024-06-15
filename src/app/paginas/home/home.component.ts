import { Component, OnInit } from '@angular/core';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem, Postagens } from 'src/app/tipos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  postagens: Postagem[] = [];

  constructor(private postagemServico: PostagemService) {}

  ngOnInit(): void {
    this.postagemServico.obterPostagens().subscribe({
      next: (data: Postagens) => {
        this.postagens = data.postagens;
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
