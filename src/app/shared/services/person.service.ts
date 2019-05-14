import { Injectable } from '@angular/core';
import { Person } from './../models/Person';

import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, pluck, retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = "https://reqres.in/api/users";
  private personsData: Person[];

  constructor(
    private http: HttpClient,
  ) { }

  getPersons(){
    if (!this.personsData) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const params = new HttpParams().set('per_page','10');
  
    return this.http.get(this.url, {headers: headers, params: params})
      .pipe( 
        pluck('data'),
        tap( (persons: Person[]) => this.personsData = persons),
        catchError( (err: HttpErrorResponse) => {
          if (err.status === 404) {
            return throwError('Not found');
          } else {
            return throwError(err.message);
          }
        })
      )
    } else {
      return of(this.personsData);
    }  
  }

  getPerson(id){
    if(this.personsData){
      let curPerson = new Person();
      this.personsData.forEach(data => {
        if(data.id == id) {curPerson = data }
      });     
      return of(curPerson);
      
    }else {
     return this.http.get(`${this.url}/${id}`)
        .pipe( 
          pluck('data'),
          catchError( (err: HttpErrorResponse) => {
            if (err.status === 404) {
              return throwError('Not found');
            } else {
              return throwError(err.message);
            }
          })
        )
    }

  }

  createPersone(newPerson, mockObj): Observable<any> {
    return this.http.post( `${this.url}`, mockObj)
      .pipe( 
        tap( () => { 
          console.log("service", this.personsData)
          this.personsData.push(newPerson)
      })); 
  }
}
