import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdicaoComponent } from './paginas/edicao/edicao.component';
import { HomeComponent } from './paginas/home/home.component';
import { VisualizacaoComponent } from './paginas/visualizacao/visualizacao.component';
import { BuscaComponent } from './paginas/busca/busca.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'editar/:postId', component: EdicaoComponent },
  { path: 'post/:postId', component: VisualizacaoComponent },
  { path: 'buscar', component: BuscaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
