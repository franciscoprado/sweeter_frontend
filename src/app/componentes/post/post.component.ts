import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExclusaoComponent } from './modal/exclusao/exclusao.component';

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
  @Input('abreviar') abreviar: boolean = false;

  constructor(public dialog: MatDialog) {}

  excluirPost(postId: number = 0): void {
    this.dialog.open(ExclusaoComponent, {
      data: { postId: postId, parent: this },
    });
  }
  
  removerItem(postId: number | undefined) {
    this.removerItemEvento.emit(postId);
  }
}
