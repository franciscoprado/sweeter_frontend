import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExclusaoComponent } from './modal/exclusao/exclusao.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  titulo = 'Título aqui';
  subtitulo = 'Subtítulo aqui';
  texto = `Texto de teste.`;

  constructor(public dialog: MatDialog) {}

  excluirPost(postId: number): void {
    this.dialog.open(ExclusaoComponent, {
      data: { postId: postId },
    });
  }

  verPost(postId: number): void {
    
  }
}
