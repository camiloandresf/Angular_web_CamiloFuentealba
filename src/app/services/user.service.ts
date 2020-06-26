import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
       return this.http.get<User[]>(environment.APIURL + 'users', {});
}

public getUserbyId(id: number): Observable<User[]> {
  return this.http.get<User[]>(environment.APIURL + 'users/' + id, {});
}

public CreateUser( name: string, age: number , username: string ): Observable<User[]> {
  return this.http.post<User[]>(environment.APIURL + 'users',
  {
    name,
    age,
    username
  });
}

public UpdateUserbyId(name: string, age: number , username: string , id: number): Observable<any> {

  return this.http.put(environment.APIURL + 'users/' + id,
   {
    name,
    age,
    username
  });
}

public DeleteUserbyId(id: number): Observable<any> {

  return this.http.delete(environment.APIURL + 'users/' + id, {});
}
}
