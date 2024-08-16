import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SessaoService } from '../servicos/sessao.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const sessaoServico = inject(SessaoService);
  const router = inject(Router);

  if (sessaoServico.estaLogado()) {
    return true;
  }

  return router.parseUrl('/login');
};
