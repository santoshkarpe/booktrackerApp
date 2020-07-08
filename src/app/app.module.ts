import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';
import { CoreModule } from './core/core.module';
import { LoggerService } from './core/logger.service';
import { DataService } from './core/data.service';
import { PlainLoggerService } from './core/plain-logger.service';
import { dataServiceFactory } from "./core/dataServiceFactory";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBookComponent,
    EditReaderComponent,
    EditBookComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [ 
    LoggerService,
    DataService
    //{ provide: LoggerService, useClass: LoggerService },   // 1 way
    //{ provide: LoggerService, useClass: PlainLoggerService },  // 2 way
    /* 
    PlainLoggerService,  // 3 way
    { provide: LoggerService, useExisting: PlainLoggerService }, */
    // 4 way
    /* { provide: LoggerService, useValue: {
      log: (message) => console.log(`MESSAGE: ${message}`),
      error: (message) => console.log(`PROBLEM: ${message}`)

    } }, */
     
    /* way 5
    { provide: DataService, useFactory: dataServiceFactory, deps: [LoggerService] } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
