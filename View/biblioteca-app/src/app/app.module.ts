import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel directive requires this
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';
import { MensagemComponent } from './mensagem/mensagem.component';

import { AppRoutingModule } from './app-routing.module';
import { LivroBuscaComponent } from './livro-busca/livro-busca.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BibliotecaComponent,
    LivroDetalheComponent,
    MensagemComponent,
    LivroBuscaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }) //The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses. Remove it when a real server is ready to receive requests.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
