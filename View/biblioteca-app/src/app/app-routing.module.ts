import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { LivroDetalheComponent } from './livro-detalhe/livro-detalhe.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'livros', component: BibliotecaComponent },
  { path: 'detalhe/:id', component: LivroDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
