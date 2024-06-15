import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostagemService } from 'src/app/servicos/postagem.service';
import { Postagem, Postagens } from 'src/app/tipos';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
})
export class BuscaComponent implements OnInit {
  buscaForm = new FormGroup({
    busca: new FormControl('', Validators.required),
  });
  postagens: Postagem[] = [];
  semPostagens: boolean = false;

  constructor(
    public postagemServico: PostagemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const termo = params['termo'];

      if (termo) {
        this.buscarTermo(termo);
        return;
      }
    });

    this.postagens = [];
  }

  buscarTermo(termo: string = '') {
    this.postagens = [];

    if (!termo) {
      termo = this.buscaForm.value.busca ?? '';
    }

    this.postagemServico.buscarPostagens(termo).subscribe({
      next: (data: Postagens) => {
        const queryParams: Params = { termo: termo };

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
        this.postagens = data.postagens;
        this.semPostagens = false;
      },
      error: (err) => {
        console.error(err.message);
        this.semPostagens = true;
      },
    });
  }
}
