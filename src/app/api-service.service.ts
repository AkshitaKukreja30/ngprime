import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient) { }

  url!: string;
  
  // The method returns an Observable, which you can subscribe to in order to retrieve the API response data.
  getData(offset: number, limit: number):  Observable<any> {
    this.url = "https://api.slingacademy.com/v1/sample-data/users?offset=" + offset + "&limit=" + limit;
    // chain RxJS operators to modify the stream of data 
    return this.http.get(this.url).pipe(
      catchError((error) => {
        // Handle any errors
        console.error(error);
        throw error; // Throw the error to propagate it further
      })
    );
}





}
