import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private apiUrl = 'http://localhost:8000/';

  username: any = '';
  password: any = '';
  invalidPassword : boolean = false;

  name = '';
  userExist :boolean = false;
  private taskList = this.http.get<any>(this.apiUrl+this.name);


  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl+ "tasklist/" +this.name )
  }

  addTask(task: any){
    // this.taskList.push(task);
    return this.http.post(this.apiUrl+ "tasklist/" +this.name, task )
  }

  login(username: string,password : string): Observable<any> {
    const loginData = {
      username,
      password
    }
    this.name = username;

    return this.http.post<any>(`${this.apiUrl}login` , loginData)
  }

  create(username: string, password: string): Observable<any> {
    const userData = {
      username,
      password
    }
    return this.http.post(`${this.apiUrl}register`,userData)
  }
}
