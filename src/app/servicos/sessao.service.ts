import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Postagem, Sessao } from '../tipos';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

const CHAVE_ACCESS_TOKEN = 'auth';

@Injectable({
  providedIn: 'root',
})
export class SessaoService {
  private sessao = new BehaviorSubject<Sessao | null>(null);

  constructor(private http: HttpClient) {
    this.restaurarSessao();
  }

  obterToken(): string {
    return sessionStorage.getItem(CHAVE_ACCESS_TOKEN) ?? '';
  }

  restaurarSessao() {
    const jsonSessao = sessionStorage.getItem(CHAVE_ACCESS_TOKEN);

    if (!jsonSessao) {
      return;
    }

    const dadosSessao: Sessao = JSON.parse(jsonSessao);
    this.sessao.next(dadosSessao);
  }

  salvarSessao(dadosSessao: Sessao) {
    sessionStorage.setItem(CHAVE_ACCESS_TOKEN, JSON.stringify(dadosSessao));

    // Dispara um novo valor para
    // quem está "ouvindo" o Observable
    // retornado pelo método getSessao
    this.sessao.next(dadosSessao);
  }

  limparSessao() {
    sessionStorage.clear();
    this.sessao.next(null);
  }

  /**
   * Retorna um Obsersable com os
   * dados da sessão do usuário
   */
  getSessao(): Observable<any> {
    return this.sessao.asObservable();
  }

  estaLogado() {
    return this.sessao.value !== null;
  }

  login(dados: FormData): Observable<Sessao> {
    return this.http.post<Sessao>(`${environment.url}/login`, dados);
  }
}
