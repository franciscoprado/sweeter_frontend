import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem, Postagem, Postagens } from '../tipos';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  obterPostagens(pagina: number = 1): Observable<Postagens> {
    return this.http.get<Postagens>(
      `${environment.url}/postagens?pagina=${pagina}`
    );
  }

  obterPostagem(postId: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${environment.url}/postagem?id=${postId}`);
  }

  editarPostagem(postagem: FormData): Observable<Postagem> {
    return this.http.put<Postagem>(`${environment.url}/postagem`, postagem);
  }

  excluirPostagem(postId: number): Observable<Mensagem> {
    return this.http.delete<Mensagem>(
      `${environment.url}/postagem?id=${postId}`
    );
  }

  buscarPostagens(termo: string, pagina: number = 1): Observable<Postagens> {
    return this.http.get<Postagens>(
      `${environment.url}/busca_postagem?termo=${termo}&pagina=${pagina}`
    );
  }

  criarPostagem(postagem: FormData): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.url}/postagem`, postagem);
  }

  curtirPostagem(postagem: FormData): Observable<Postagem> {
    return this.http.put<Postagem>(`${environment.url}/curtir`, postagem);
  }

  obterRespostas(postId: number): Observable<Postagens> {
    return this.http.get<Postagens>(`${environment.url}/respostas?id=${postId}`);
  }
}
