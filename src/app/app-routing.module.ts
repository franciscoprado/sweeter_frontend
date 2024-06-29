import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdicaoComponent } from './paginas/edicao/edicao.component';
import { HomeComponent } from './paginas/home/home.component';
import { VisualizacaoComponent } from './paginas/visualizacao/visualizacao.component';
import { BuscaComponent } from './paginas/busca/busca.component';
import { CriacaoComponent } from './paginas/criacao/criacao.component';
import { RespostaComponent } from './paginas/resposta/resposta.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'editar/:postId', component: EdicaoComponent },
  { path: 'post/:postId', component: VisualizacaoComponent },
  { path: 'buscar', component: BuscaComponent },
  { path: 'criar', component: CriacaoComponent },
  { path: 'responder/:postId', component: RespostaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
