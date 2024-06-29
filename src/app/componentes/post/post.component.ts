import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExclusaoComponent } from './modal/exclusao/exclusao.component';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem } from 'src/app/tipos';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Output() removerItemEvento = new EventEmitter<number>();
  @Input('id') id: number | undefined;
  @Input('titulo') titulo: string | undefined;
  @Input('subtitulo') subtitulo: string | undefined;
  @Input('texto') texto: string | undefined;
  @Input('curtidas') curtidas: number | undefined;
  @Input('data_insercao') data_insercao: string | undefined;
  @Input('abreviar') abreviar: boolean = false;
  @Input('destaque') destaque: boolean = false;

  constructor(
    public dialog: MatDialog,
    private postagemServico: PostagemService
  ) {}

  excluirPost(postId: number = 0): void {
    this.dialog.open(ExclusaoComponent, {
      data: { postId: postId, parent: this },
    });
  }

  removerItem(postId: number | undefined) {
    this.removerItemEvento.emit(postId);
  }

  curtir(postId: number | undefined) {
    if (!postId) return;

    const formData = new FormData();
    formData.append('id', postId.toString());

    this.postagemServico.curtirPostagem(formData).subscribe({
      next: (data: Postagem) => {
        this.curtidas = data.curtidas;
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
