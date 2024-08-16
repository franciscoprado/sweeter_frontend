import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EdicaoComponent } from './paginas/edicao/edicao.component';
import { HomeComponent } from './paginas/home/home.component';
import { VisualizacaoComponent } from './paginas/visualizacao/visualizacao.component';
import { BuscaComponent } from './paginas/busca/busca.component';
import { CriacaoComponent } from './paginas/criacao/criacao.component';
import { LoginComponent } from './paginas/login/login.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './paginas/logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'editar/:postId',
    component: EdicaoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'post/:postId',
    component: VisualizacaoComponent,
  },
  { path: 'buscar', component: BuscaComponent },
  { path: 'criar', component: CriacaoComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
