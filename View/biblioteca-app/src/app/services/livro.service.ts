import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Livros } from '../Interfaces/livros';
import { LIVROS } from '../mocks/mock-livros';
import { MensagemService } from './mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private livrosUrl = 'api/livros';

  constructor(
    private http: HttpClient,
    private mensagemService: MensagemService) { }

private log(mensagem: string) {
  this.mensagemService.add(`LivroService: ${mensagem}`)
}

/*--------------------------------------------------------------------
 * GET hero by id. Will 404 if id not found
*/
getLivro(id: number): Observable<Livros> {
  const url = `${this.livrosUrl}/${id}`;
  return this.http.get<Livros>(url)
  .pipe(
    tap(_ => this.log(`fetched livro id=${id}`)),
    catchError(this.handleError<Livros>(`getLivro id=${id}`))
  );
}

/*--------------------------------------------------------------------
 * GET livros from the server
*/
getLivros(): Observable<Livros[]> {
  return this.http.get<Livros[]>(this.livrosUrl)
  .pipe(
    tap(_ => this.log('fetched livros')),
    catchError(this.handleError<Livros[]>('getLivros', []))
  );
}

/*--------------------------------------------------------------------
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/*--------------------------------------------------------------------
 * PUT: update the hero on the server
*/
updateLivro(livro: Livros): Observable<any> {
  return this.http.put(this.livrosUrl, livro, this.httpOptions)
  .pipe(
    tap(_ => this.log(`updated livro id=${livro.id}`)),
    catchError(this.handleError<any>('updateLivro'))
  );
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*--------------------------------------------------------------------
 * POST: add a new livro to the server
*/
addLivro(livro: Livros): Observable<Livros> {
  return this.http.post<Livros>(this.livrosUrl, livro, this.httpOptions).pipe(
    tap((newLivro: Livros) => this.log(`added livro w/ id=${newLivro.id}`)),
    catchError(this.handleError<Livros>('addLivro'))
  );
}
/*--------------------------------------------------------------------
 * DELETE: delete the livro from the server
*/
deleteLivro(id: number): Observable<Livros> {
  const url = `${this.livrosUrl}/${id}`;

  return this.http.delete<Livros>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted livro id=${id}`)),
    catchError(this.handleError<Livros>('deleteLivro'))
  );
}
/*--------------------------------------------------------------------
 * GET livros whose name contains search term
 */
searchLivros(term: string): Observable<Livros[]> {
  if (!term.trim()) {
    // if not search term, return empty livro array.
    return of([]);
  }
  return this.http.get<Livros[]>(`${this.livrosUrl}/?nome=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found livros matching "${term}"`) :
       this.log(`no livros matching "${term}"`)),
    catchError(this.handleError<Livros[]>('searchLivros', []))
  );
}

}
