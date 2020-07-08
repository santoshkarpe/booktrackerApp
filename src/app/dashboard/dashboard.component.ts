import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from "../models/book";
import { Reader } from "../models/reader";
import { DataService } from '../core/data.service';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private loggerService: LoggerService) { 
    this.loggerService.log(`Creating the Dashboard!`)
  }
  
  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    //this.allReaders = this.dataService.getAllReaders();
    this.dataService.getAllReaders().subscribe(
      data => this.allReaders = data,
      err => console.log(err),
      () => console.log('All done getting readers!')
    )
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
    this.loggerService.log('Done with dashboard initialization')
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
