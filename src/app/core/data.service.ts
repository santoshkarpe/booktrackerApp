import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators'

import { allBooks, allReaders } from '../data';
import { Reader } from "../models/reader";
import { Book } from "../models/book";
import { BookTrackerError } from '../models/bookTrackerError';
import { OldBook } from '../models/oldBook'

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    //return allBooks;
    console.log('Getting all the books from server')
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    //return allBooks.find(book => book.bookID === id);
    //return this.http.get<Book>(`/api/books/${id}`);

    /* let getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'
    })
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: getHeaders
    }) */

    
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    })

  }
  
  getOldBookById(id: number): Observable<OldBook> {

    return this.http.get<Book>(`/api/books/${id}`)
              .pipe(
                map( b => <OldBook> {
                  bookTitle: b.title,
                  year: b.publicationYear
                }),
                tap( classicBook => console.log(classicBook))
              );

  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateBook(updBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updBook.bookID}`, updBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookId}`);
  }
}
