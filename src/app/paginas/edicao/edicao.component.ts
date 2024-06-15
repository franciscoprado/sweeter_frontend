import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem } from 'src/app/tipos';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrl: './edicao.component.scss',
  imports: [ReactiveFormsModule, MatInputModule, MatButton],
  standalone: true,
})
export class EdicaoComponent implements OnInit {
  postForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    subtitulo: new FormControl(''),
    texto: new FormControl('', Validators.required),
  });

  postagem: Postagem | undefined;
  constructor(
    private postagemServico: PostagemService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.params['postId'];

    this.postagemServico.obterPostagem(parseInt(postId)).subscribe({
      next: (data: Postagem) => {
        let postagem: Postagem = data;
        this.postForm.setValue({
          titulo: postagem.titulo,
          subtitulo: postagem.subtitulo,
          texto: postagem.texto,
        });
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }

  salvarEdicao() {
    const postId = this.route.snapshot.params['postId'];
    const formData = new FormData();

    formData.append('id', postId);
    formData.append('titulo', this.postForm.get('titulo')?.value ?? '');
    formData.append('subtitulo', this.postForm.get('subtitulo')?.value ?? '');
    formData.append('texto', this.postForm.get('texto')?.value ?? '');

    this.postagemServico.editarPostagem(formData).subscribe({
      next: (data: Postagem) => {
        this.snackBar.open('Postagem salva com sucesso.', 'Fechar');
        this.router.navigate(['post', postId]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
