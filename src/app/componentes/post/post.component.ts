import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExclusaoComponent } from './modal/exclusao/exclusao.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input('id') id: number | undefined;
  @Input('titulo') titulo: string | undefined;
  @Input('subtitulo') subtitulo: string | undefined;
  @Input('texto') texto: string | undefined;
  @Input('abreviar') abreviar: boolean = false;

  constructor(public dialog: MatDialog) {}

  excluirPost(postId: number): void {
    this.dialog.open(ExclusaoComponent, {
      data: { postId: postId },
    });
  }

  verPost(postId: number): void {}
}
