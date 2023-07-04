import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {Subject} from "./subject.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};






@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjectsUrl = 'http://localhost:8080/subjects';


  // Add totalItems property as BehaviorSubject
  public totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  addSubject(subject: { course: string }): Observable<Subject> {
    return this.http.post<Subject>(this.subjectsUrl, subject, httpOptions);
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectsUrl);
  }

  getSubject(id: number): Observable<Subject> {
    const url = `${this.subjectsUrl}/${id}`;
    return this.http.get<Subject>(url).pipe(
      tap(_ => this.log(`fetched subject id=${id}`)),
      catchError(this.handleError<Subject>(`getSubject id=${id}`))
    );
  }

  deleteSubject(subject: Subject | number): Observable<Subject> {
    const id = typeof subject === 'number' ? subject : subject.id;
    const url = `${this.subjectsUrl}/${id}`;
    return this.http.delete<Subject>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted subject id=${id}`)),
      catchError(this.handleError<Subject>('deleteSubject'))
    );
  }

  deleteSubjects(): Observable<Subject> {
    return this.http.delete<Subject>(this.subjectsUrl, httpOptions).pipe(
      tap(_ => this.log(`deleted subjects`)),
      catchError(this.handleError<Subject>('deleteSubjects'))
    );
  }

  updateSubject(subject: Subject, id: number): Observable<Subject> {
    return this.http.put<Subject>(`${this.subjectsUrl}/${id}`, subject, httpOptions).pipe(
      tap((subjectUpdated: Subject) => this.log(`updated subject id=${subjectUpdated.id}`)),
      catchError(this.handleError<any>('updateSubject'))
    );
  }
  searchSubjectsByName(searchTerm: string): Observable<Subject[]> {
    const url = `${this.subjectsUrl}?name=${searchTerm}`;
    return this.http.get<Subject[]>(url).pipe(
      tap(_ => this.log(`found subjects matching "${searchTerm}"`)),
      catchError(this.handleError<Subject[]>('searchSubjectsByName', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('SubjectService: ' + message);
  }
}
