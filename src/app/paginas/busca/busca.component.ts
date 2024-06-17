import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  termo: string = '';
  semPostagens: boolean = false;
  pagina: number = 1;
  carregando: boolean = false;
  semMaisPostagens: boolean = false;

  constructor(
    public postagemServico: PostagemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.termo = '';
    this.activatedRoute.queryParams.subscribe((params) => {
      this.termo = params['termo'] ?? '';
      this.postagens = [];

      if (!this.termo) return;
      if (!this.carregando) {
        this.buscarTermo();
        return;
      }
    });
  }

  enviar() {
    this.postagens = [];
    this.pagina = 1;
    this.termo = this.buscaForm.value.busca ?? '';
    const queryParams: Params = { termo: this.termo };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.buscarTermo();
  }

  buscarTermo() {
    this.carregando = true;
    this.postagemServico.buscarPostagens(this.termo, this.pagina).subscribe({
      next: (data: Postagens) => {
        this.semMaisPostagens = data.postagens.length === 0;
        this.postagens.push(...data.postagens);
        this.semPostagens = this.postagens.length === 0;
        this.carregando = false;
      },
      error: (err) => {
        console.error(err.message);
        this.carregando = false;
        this.semPostagens = true;
      },
    });
  }

  carregarMais() {
    if (this.carregando || this.semMaisPostagens) return;

    this.pagina += 1;
    this.buscarTermo();
  }
}
