// import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
// import { DataService } from './api-service.service';
// import { tap } from 'rxjs/operators';
// import { LazyLoadEvent } from 'primeng/api';
// import { TableLazyLoadEvent } from 'primeng/table';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
//   // changeDetection: ChangeDetectionStrategy.OnPush
// })

// export class AppOldComponent implements OnInit{
//   lastScrollPosition: number = 0;
//   dt1: any;

//   // constructor(private dataService: DataService, private chandeDetection: ChangeDetectorRef) {}

//   constructor(private dataService: DataService) {}

//   responseData: any[] = [];
//   cols: any[] = [];
//   selectedData : any;
//   loading: boolean = false;
//   hasloaded: boolean = false;

//   tableData: any[] = [];

//   offset: number = 0;
//   limit: number = 20;

//   lastRowOffset : number = 0 ;
//   totalRecords: number = 0;

//   ngOnInit() {

//     this.cols = [
//       { field: 'id', header: 'Id' },
//       { field: 'first_name', header: 'First Name' },
//       { field: 'email', header: 'Email' },
//       { field: 'date_of_birth', header: 'DOB' },
//       { field: 'country', header: 'Country' },
//       { field: 'city', header: 'City' },
//       { field: 'state', header: 'State' },
//       { field: 'zipcode', header: 'Zipcode' },
//       { field: 'phone', header: 'Phone' },
  
//       // Add more column definitions here
//     ];

//       this.dataService.getData(0,1000).subscribe(response => {
//         this.responseData = response.users;
//         this.totalRecords = this.responseData.length;
//         console.log(this.responseData);
//         //this.tableData = this.responseData;
//         this.offset += this.limit;   
//       });

//       // The tap operator can be used at any point within an Observable pipeline.
//       //  It does not modify the stream, so it returns the same Observable that it was called on, 
//       //  allowing you to continue chaining other operators.

//   }
  
  

//   async onVirtualScroll(event: any){
//     //if(true){
// // const lastRowOffset = event.first + event.rows;
//     // const totalRecords = this.responseData.length;

//     // // This condition checks if the last row's offset matches the total number of records
//     // // indicating that the last row is visible, and we need to load more data to continue scrolling.

//     // if(lastRowOffset === totalRecords){
//       //await this.getDataInPagination();

//       // event.first: This is a property from the event object that indicates the index of the first visible item in the current view or viewport of the virtual scroll.
//       // event.rows: This is a property from the event object that represents the number of rows or items visible in the current view or viewport of the virtual scroll.

//       //load data of required page
//       let rows = event.rows> 0 ? event.rows : 10;
//       let loadedData = this.responseData.slice(event.first ?? 0, (event.first + rows)?? 10);
   
//        //populate page of virtual data/ display Data
//       //  The splice method modifies the this.tableData array in place by removing event.rows elements starting from the index event.first and replacing them with the contents of loadedData. This operation effectively updates the visible items in the virtual scroll with the new data loaded as the user scrolls through the table.
//        //Array.prototype.splice.apply(this.tableData, [event.first ?? 0, rows ?? 10, ...loadedData]);
//        this.tableData.splice(event.first , rows , ...loadedData);
   
//       //trigger change detection
//       event.forceUpdate();
//       //this.change.detectChanges();
   
//     //   if (event.first + event.rows === this.tableData.length) {
//     //    this.getDataInPagination();
//     //  }
//     // }
// }


// async getDataInPagination(){
//   this.dataService.getData(this.offset, this.limit).subscribe({
//     next: (response) => {
//     this.responseData = [...this.responseData, ...response.users];
//   },error(error){
//     console.log(error);
//   },
//   complete: () => {
//     this.offset += this.limit;        
//     this.loading = false;
//     this.hasloaded = true;  
//   },
//   });
// }


//   loopArray(n: number): number[] {
//     return Array.from({ length: n }, (_, index) => index + 1);
//   }

 
// }
