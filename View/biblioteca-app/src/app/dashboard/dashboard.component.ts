import { Component, OnInit } from '@angular/core';

import { Livros } from '../Interfaces/livros';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  livros: Livros[] = [];

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.getLivros();
  }

  getLivros(): void {
    this.livroService.getLivros()
      .subscribe(livros => this.livros = livros.slice(1, 5));
  }
}
