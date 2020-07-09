import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from "../models/book";
import { Reader } from "../models/reader";
import { DataService } from '../core/data.service';
import { LoggerService } from '../core/logger.service';
import { BookTrackerError } from '../models/bookTrackerError';

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
      (data: Reader[]) => this.allReaders = data,
      (err: BookTrackerError) => console.log(err.friendlyMessage),
      () => console.log('All done getting readers!')
    )
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);

    this.dataService.getAuthorRecommendation(1).then(
      (author: string) => {
        this.loggerService.log(author);
        throw new Error('Problem in the success handler!')
      },
      (err: string) => this.loggerService.error(`The promise was rejected: ${err}`)
    ).catch((error: Error) => this.loggerService.error(error.message));

    this.loggerService.log('Done with dashboard initialization')
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
