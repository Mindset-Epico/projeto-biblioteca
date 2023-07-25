import { Component, OnInit } from '@angular/core';

import { Livros } from '../Interfaces/livros';
import { LIVROS } from '../mocks/mock-livros';

import { LivroService } from '../services/livro.service';
import { MensagemService } from '../services/mensagem.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {

    livros: Livros[] = [];

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.getLivros();
  }

  getLivros(): void {
    this.livroService.getLivros().subscribe(livros => this.livros = livros)
  }

  add(nome: string): void {
    nome = nome.trim();
    if (!nome) { return; }
    this.livroService.addLivro({ nome } as Livros)
      .subscribe(livro => {
        this.livros.push(livro);
      });
  }

  delete(livro: Livros): void {
    this.livros = this.livros.filter(l => l !== livro);
    this.livroService.deleteLivro(livro.id).subscribe();
  }
}
