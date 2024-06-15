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
  semPostagens: boolean = false;

  constructor(private postagemServico: PostagemService) {}

  ngOnInit(): void {
    this.postagemServico.obterPostagens().subscribe({
      next: (data: Postagens) => {
        this.postagens = data.postagens;
        this.semPostagens = false;
      },
      error: (err) => {
        this.semPostagens = true;
        console.error(err.message);
      },
    });
  }

  removerItemDaLista(postId: number) {
    let lista = this.postagens.filter((item) => item.id != postId);
    this.postagens = lista;
  }
}
