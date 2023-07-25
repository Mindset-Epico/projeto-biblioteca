import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
debounceTime,
distinctUntilChanged,
switchMap
} from 'rxjs/operators';
import { Livros } from '../Interfaces/livros';
import { LivroService } from '../services/livro.service';

@Component({
  selector: 'app-livro-busca',
  templateUrl: './livro-busca.component.html',
  styleUrls: ['./livro-busca.component.scss']
})
export class LivroBuscaComponent implements OnInit {

  livros$!: Observable<Livros[]>;
  private searchTerms = new Subject<string>();

  constructor(private livroService: LivroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.livros$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.livroService.searchLivros(term)),
    );
  }

}
