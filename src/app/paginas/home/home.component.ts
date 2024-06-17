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
  pagina: number = 1;
  carregando: boolean = false;
  semMaisPostagens: boolean = false;

  constructor(private postagemServico: PostagemService) {}

  ngOnInit(): void {
    this.carregarPostagens();
  }

  carregarPostagens() {
    this.carregando = true;

    this.postagemServico.obterPostagens(this.pagina).subscribe({
      next: (data: Postagens) => {
        this.semMaisPostagens = data.postagens.length === 0;
        this.postagens.push(...data.postagens);
        this.semPostagens = false;
        this.carregando = false;
      },
      error: (err) => {
        this.semPostagens = true;
        this.carregando = false;
        console.error(err.message);
      },
    });
  }

  removerItemDaLista(postId: number) {
    let lista = this.postagens.filter((item) => item.id != postId);
    this.postagens = lista;
  }

  carregarMais() {
    if (this.carregando || this.semMaisPostagens) return;

    this.pagina += 1;
    this.carregarPostagens();
  }
}
