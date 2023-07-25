import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Livros } from '../Interfaces/livros';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const livros = [
  { id: 12, nome: 'Harry Potter' },
  { id: 13, nome: 'Senhor dos Aneis' },
  { id: 14, nome: 'Star Wars' },
  { id: 15, nome: 'Star Trek' },
  { id: 16, nome: 'Dracula' },
  { id: 17, nome: 'Conan o Barbaro' },
  { id: 18, nome: 'Dungeons & Dragons' },
  { id: 19, nome: 'Sherlock Holmes' },
  { id: 20, nome: 'Cthulhu' }
    ];
    return {livros};
  }

  // Overrides the genId method to ensure that a livro always has an id.
  // If the livros array is empty,
  // the method below returns the initial number (11).
  // if the livros array is not empty, the method below returns the highest
  // livro id + 1.
  genId(livros: Livros[]): number {
    return livros.length > 0 ? Math.max(...livros.map(livro => livro.id)) + 1 : 11;
  }
}
