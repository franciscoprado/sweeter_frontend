import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatCardModule } from '@angular/material/card';
import { NavegacaoComponent } from './componentes/navegacao/navegacao.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PostComponent } from './componentes/post/post.component';
import { HomeComponent } from './paginas/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideHttpClient } from '@angular/common/http';
import { VisualizacaoComponent } from './paginas/visualizacao/visualizacao.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacaoComponent,
    PostComponent,
    HomeComponent,
    VisualizacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(), {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
  bootstrap: [AppComponent],
})
export class AppModule {}
