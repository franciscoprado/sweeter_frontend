import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { SessaoService } from './servicos/sessao.service';
import { Sessao } from './tipos';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const sessaoServico = inject(SessaoService);

  if (!sessaoServico.obterToken()) return next(req);

  const token:Sessao = JSON.parse(sessaoServico.obterToken());
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token.access_token}`
    }
  });

  return next(authReq);
};
