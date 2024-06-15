import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem } from 'src/app/tipos';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.component.html',
  styleUrl: './visualizacao.component.scss',
})
export class VisualizacaoComponent implements OnInit {
  postagem: Postagem | undefined;
  constructor(
    private postagemServico: PostagemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let postId = this.route.snapshot.params['postId'];

    this.postagemServico.obterPostagem(parseInt(postId)).subscribe({
      next: (data: Postagem) => {
        this.postagem = data;
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
