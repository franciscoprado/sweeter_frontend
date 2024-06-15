import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem, Postagem, Postagens } from '../tipos';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  obterPostagens(): Observable<Postagens> {
    return this.http.get<Postagens>(`${environment.url}/postagens`);
  }

  obterPostagem(postId: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${environment.url}/postagem?id=${postId}`);
  }

  editarPostagem(postagem: FormData): Observable<Postagem> {
    let httpParams = new HttpHeaders();
    httpParams = httpParams.set('Content-Type', 'multipart/form-data');
    return this.http.put<Postagem>(`${environment.url}/postagem`, postagem);
  }

  excluirPostagem(postId: number): Observable<Mensagem> {
    return this.http.delete<Mensagem>(
      `${environment.url}/postagem?id=${postId}`
    );
  }

  buscarPostagens(termo: string): Observable<Postagens> {
    return this.http.get<Postagens>(
      `${environment.url}/busca_postagem?termo=${termo}`
    );
  }
}
