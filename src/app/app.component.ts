import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataService } from './api-service.service';
import { tap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  lastScrollPosition: number = 0;
  dt1: any;

  constructor(private dataService: DataService) {}

  responseData: any[] = [];
  cols: any[] = [];
  selectedData : any;
  // loading: boolean = false;
  // hasloaded: boolean = false;

  offset: number = 0;
  limit: number = 20;

  lastRowOffset : number = 0 ;
  totalRecords: number = 0;

  ngOnInit() {

    this.cols = [
      { field: 'id', header: 'Id' ,  frozen: true, direction:'left'},
      { field: 'first_name', header: 'First Name' ,  frozen: false},
      { field: 'email', header: 'Email',  frozen: false },
      { field: 'date_of_birth', header: 'DOB', frozen: false},
      { field: 'country', header: 'Country', frozen: false },
      { field: 'city', header: 'City', frozen: false },
      { field: 'state', header: 'State' , frozen: false},
      { field: 'zipcode', header: 'Zipcode' , frozen: true, direction:'right'},
      { field: 'phone', header: 'Phone' , frozen: true, direction:'right'},
  
      // Add more column definitions here
    ];

    //initial length for ghost loading
     this.responseData.length = 10;
      this.dataService.getData(0,40).subscribe(response => {
        this.responseData = response.users;
        this.totalRecords = this.responseData.length;
        console.log(this.responseData);
        this.offset = 40;   
      });

      // The tap operator can be used at any point within an Observable pipeline.
      //  It does not modify the stream, so it returns the same Observable that it was called on, 
      //  allowing you to continue chaining other operators.

  }
  

  onVirtualScroll(event: any){
   

    // event.first  -> index of first item in the viewport
    // event.rows   -> num of rows in viewport
    // event.last   -> index of last item in viewport


    // viewport -> 10





    // const firstRowOfCurrentPage = (this.currentPage - 1) * limit;
    // const lastRowOfCurrentPage = this.currentPage * limit;
    // const lastRowOffset = event.first + event.rows;
  
    // if (lastRowOffset >= lastRowOfCurrentPage)
    //this.lastRowOffset = event.first + event.rows;
    //this.totalRecords = this.responseData.length;

    // This condition checks if the last row's offset matches the total number of records
    // indicating that the last row is visible, and we need to load more data to continue scrolling.

    if(event.last == this.responseData.length && this.responseData.length>10){
      this.dataService.getData(this.offset, this.limit).subscribe(response => {
        this.responseData = [...this.responseData, ...response.users];
        this.offset += this.limit;        
      });
    }
  }
 

  loopArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

 
}