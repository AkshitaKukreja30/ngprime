import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DataService } from './api-service.service';
import { tap } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit{
  lastScrollPosition: number = 0;
  dt1: any;

  // constructor(private dataService: DataService, private chandeDetection: ChangeDetectorRef) {}

  constructor(private dataService: DataService) {}

  responseData: any[] = [];
  cols: any[] = [];
  selectedData : any;
  loading: boolean = false;
  hasloaded: boolean = false;

  offset: number = 0;
  limit: number = 20;

  lastRowOffset : number = 0 ;
  totalRecords: number = 0;

  ngOnInit() {

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'first_name', header: 'First Name' },
      { field: 'email', header: 'Email' },
      { field: 'date_of_birth', header: 'DOB' },
      { field: 'country', header: 'Country' },
      { field: 'city', header: 'City' },
      { field: 'state', header: 'State' },
      { field: 'zipcode', header: 'Zipcode' },
      { field: 'phone', header: 'Phone' },
  
      // Add more column definitions here
    ];

      this.dataService.getData(0,20).subscribe(response => {
        this.responseData = response.users;
        this.totalRecords = this.responseData.length;
        console.log(this.responseData);
        this.offset += this.limit;   
      });

      // The tap operator can be used at any point within an Observable pipeline.
      //  It does not modify the stream, so it returns the same Observable that it was called on, 
      //  allowing you to continue chaining other operators.

  }
  
  // onVirtualScroll(event: any){

  //   // const firstRowOfCurrentPage = (this.currentPage - 1) * limit;
  //   // const lastRowOfCurrentPage = this.currentPage * limit;
  //   // const lastRowOffset = event.first + event.rows;
  
  //   // if (lastRowOffset >= lastRowOfCurrentPage)
  //       this.lastRowOffset = event.first + event.rows;
  //       this.totalRecords = this.responseData.length;


  //   // This condition checks if the last row's offset matches the total number of records
  //   // indicating that the last row is visible, and we need to load more data to continue scrolling.

  //   if(this.lastRowOffset === this.totalRecords){
    
  //     this.dataService.getData(this.offset, this.limit).pipe(tap((response) => {
  //       this.responseData = [...this.responseData, ...response.users];

  //       this.offset += this.limit;        

  //       //this.responseData.splice(0, this.responseData.length, ...response.users);
  //       //this.responseData.splice(this.responseData.length,0, ...response.users);


  //       //let currentData = this.responseData.slice(event.first, event.first + event.rows);
  //       //Array.prototype.splice.apply(this.responseData, [...[event.first, event.rows], ...currentData]);

  //       //Array.prototype.splice.apply(this.responseData,  [this.responseData.length,0,...response.users]);
  //       console.log(this.responseData);
  //       //event.forceUpdate();
  //       //this.chandeDetection.detectChanges();
  //     })).subscribe(response => {

  //       this.loading = false
  //     });
  //   }
  // }



  onVirtualScroll(event: any){
   
    // const firstRowOfCurrentPage = (this.currentPage - 1) * limit;
    // const lastRowOfCurrentPage = this.currentPage * limit;
    // const lastRowOffset = event.first + event.rows;
  
    // if (lastRowOffset >= lastRowOfCurrentPage)
        this.lastRowOffset = event.first + event.rows;
        this.totalRecords = this.responseData.length;

    // This condition checks if the last row's offset matches the total number of records
    // indicating that the last row is visible, and we need to load more data to continue scrolling.

    if(this.lastRowOffset === this.totalRecords && this.responseData.length>0){
      this.dataService.getData(this.offset, this.limit).subscribe(response => {
        this.responseData = [...this.responseData, ...response.users];
        this.offset += this.limit;        
        this.loading = false;
        this.hasloaded = true;
      });
    }
  }


  // @HostListener('window:scroll', ['$event'])
  onTableScroll(event: Event) {
    const scrollY = window.scrollY;
    if (scrollY > this.lastScrollPosition && !this.loading) {
      // this.page++;
      this.offset += this.limit;
      this.loadMoreDataOnScroll();
      this.lastScrollPosition = scrollY;
    }
  }

  

  loadMoreDataOnScroll() {

    this.loading = true;
      this.dataService.getData(this.offset, this.limit).pipe(tap((response) => {
        this.responseData = [...this.responseData, ...response.users];
        //this.loading = false;
        // console.log(this.responseData);
      })).subscribe(response => {
        this.loading = false;
      });
  }

  loopArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index + 1);
  }

  // ngOnDestroy() {
  //   window.removeEventListener('scroll', this.onWindowScroll);
  // }

 
}
