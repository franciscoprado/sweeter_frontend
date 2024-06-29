import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem } from 'src/app/tipos';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrl: './resposta.component.scss',
})
export class RespostaComponent implements OnInit {
  postagem: Postagem | undefined;
  postForm = new FormGroup({
    texto: new FormControl('', Validators.required),
  });

  constructor(
    private postagemServico: PostagemService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
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

  enviarResposta() {
    const postId = this.route.snapshot.params['postId'];
    const formData = new FormData();

    formData.append('titulo', `Resposta a "${this.postagem?.titulo}"`);
    formData.append('subtitulo', '');
    formData.append('texto', this.postForm.get('texto')?.value ?? '');
    formData.append('postagem_mae', postId);

    this.postagemServico.criarPostagem(formData).subscribe({
      next: (data: Postagem) => {
        this.snackBar.open('Resposta criada com sucesso.', 'Fechar', {
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
