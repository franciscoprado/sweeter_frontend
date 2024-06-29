import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem, Postagens } from 'src/app/tipos';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrl: './visualizacao.component.scss',
})
export class VisualizacaoComponent implements OnInit {
  postagem: Postagem | undefined;
  postagemMae: Postagem | undefined;
  respostas: Postagem[] = [];

  constructor(
    private postagemServico: PostagemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      let postId = this.route.snapshot.params['postId'];

      this.postagemServico.obterPostagem(parseInt(postId)).subscribe({
        next: (data: Postagem) => {
          this.postagem = data;
          this.carregarPostagemMae(this.postagem.postagem_mae);
          this.carregarRespostas(postId);
        },
        error: (err) => {
          console.error(err.message);
        },
      });
    });
  }

  carregarPostagemMae(postagemMaeId: number | undefined) {
    if (!postagemMaeId) return;

    this.postagemServico.obterPostagem(postagemMaeId).subscribe({
      next: (data: Postagem) => {
        this.postagemMae = data;
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }

  carregarRespostas(postagemMaeId: number) {
    this.postagemServico.obterRespostas(postagemMaeId).subscribe({
      next: (data: Postagens) => {
        this.respostas = data.postagens;
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
