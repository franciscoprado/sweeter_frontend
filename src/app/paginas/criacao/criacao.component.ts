import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem } from 'src/app/tipos';

@Component({
  selector: 'app-criacao',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './criacao.component.html',
  styleUrl: './criacao.component.scss',
})
export class CriacaoComponent {
  postForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    subtitulo: new FormControl(''),
    texto: new FormControl('', Validators.required),
  });

  constructor(
    private postagemServico: PostagemService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  salvarEdicao() {
    const postId = this.route.snapshot.params['postId'];
    const formData = new FormData();

    formData.append('id', postId);
    formData.append('titulo', this.postForm.get('titulo')?.value ?? '');
    formData.append('subtitulo', this.postForm.get('subtitulo')?.value ?? '');
    formData.append('texto', this.postForm.get('texto')?.value ?? '');

    this.postagemServico.criarPostagem(formData).subscribe({
      next: (data: Postagem) => {
        this.snackBar.open('Postagem criada com sucesso.', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['post', data.id]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
