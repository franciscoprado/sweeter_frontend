import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Postagem, Postagens } from '../tipos';

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

  editarPostagem(postagem: any): Observable<any> {
    let httpParams = new HttpHeaders();
    httpParams = httpParams.set('Content-Type', 'multipart/form-data');
    return this.http.put<any>(
      `http://172.19.166.134:5000/postagem`,
      postagem
    );
  }
}
