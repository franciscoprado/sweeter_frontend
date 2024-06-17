import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HomeComponent } from 'src/app/paginas/home/home.component';
import { BuscaComponent } from 'src/app/paginas/busca/busca.component';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrl: './navegacao.component.scss',
})
export class NavegacaoComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  componentRef: HomeComponent | BuscaComponent | undefined;

  atualizarRolagem(event: any) {
    if (!this.componentRef) return;

    const elemento = event.target;
    const rolagemMaxima = elemento.scrollHeight - elemento.clientHeight;
    const posicaoAtual = event.target.scrollTop;

    if (rolagemMaxima < 400) return;

    if (posicaoAtual >= rolagemMaxima - 100) {
      this.componentRef.carregarMais();
    }
  }

  ativacao(componentRef: any) {
    if (
      componentRef instanceof HomeComponent ||
      componentRef instanceof BuscaComponent
    ) {
      this.componentRef = componentRef;
    }
  }
}
