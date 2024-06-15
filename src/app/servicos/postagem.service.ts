import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem, Postagem, Postagens } from '../tipos';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  obterPostagens(): Observable<Postagens> {
    return this.http.get<Postagens>('http://172.19.166.134:5000/postagens');
  }

  obterPostagem(postId: number): Observable<Postagem> {
    return this.http.get<Postagem>(
      `http://172.19.166.134:5000/postagem?id=${postId}`
    );
  }

  editarPostagem(postagem: FormData): Observable<Postagem> {
    let httpParams = new HttpHeaders();
    httpParams = httpParams.set('Content-Type', 'multipart/form-data');
    return this.http.put<Postagem>(
      `http://172.19.166.134:5000/postagem`,
      postagem
    );
  }

  excluirPostagem(postId: number): Observable<Mensagem> {
    return this.http.delete<Mensagem>(
      `http://172.19.166.134:5000/postagem?id=${postId}`
    );
  }
}
