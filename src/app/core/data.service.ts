import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { allBooks, allReaders } from '../data';
import { Reader } from "../models/reader";
import { Book } from "../models/book";
import { BookTrackerError } from '../models/bookTrackerError';

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
}
