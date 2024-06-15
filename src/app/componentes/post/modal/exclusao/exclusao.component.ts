import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Mensagem, Postagem } from 'src/app/tipos';
import { PostComponent } from '../../post.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exclusao',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './exclusao.component.html',
  styleUrl: './exclusao.component.scss',
})
export class ExclusaoComponent {
  postId: number | undefined;
  parent: PostComponent;

  constructor(
    public dialogRef: MatDialogRef<ExclusaoComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public postagemServico: PostagemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.postId = data.postId;
    this.parent = data.parent;
  }

  removerPostagem() {
    if (!this.postId) {
      return;
    }

    this.postagemServico.excluirPostagem(this.postId).subscribe({
      next: (data: Mensagem) => {
        let mensagem: Mensagem = data;
        this.parent.removerItem(this.postId);
        this.router.navigate(['/']);
        this.dialogRef.close();
        this.snackBar.open(data.mensagem, 'Fechar');
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }
}
