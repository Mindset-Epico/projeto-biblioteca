import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Livros } from '../Interfaces/livros';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.component.html',
  styleUrls: ['./livro-detalhe.component.scss']
})
export class LivroDetalheComponent implements OnInit {

  @Input() livro?: Livros;
  //livro: Livros | undefined;

  constructor(
    private route: ActivatedRoute,
    private livroService: LivroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getLivro();
  }

  getLivro(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.livroService.getLivro(id)
      .subscribe(livro => this.livro = livro);
  }

  salvar(): void {
    if (this.livro) {
      this.livroService.updateLivro(this.livro)
        .subscribe(() => this.voltar());
    }
  }

  voltar(): void {
    this.location.back();
  }

}
