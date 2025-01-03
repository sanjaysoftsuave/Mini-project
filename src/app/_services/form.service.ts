import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {


  constructor(private http: HttpClient) {
    this.getUsername()
  }

  public apiUrl = 'http://localhost:8000/';
  public username!: string ;
  public password: string = '';
  public invalidPassword : boolean = false;
  public isAuthenticated = false;

  userExist :boolean = false;




  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setUsername(username: string): void {
    sessionStorage.setItem("username", username);
  }

  getUsername(): any {
    this.username = sessionStorage.getItem("username") || '';
  }



  updateTask(index: number, updatedTask : any): any {
    return this.http.put(`${this.apiUrl}${this.username}/${index}`,{
      updatedTask: updatedTask
    })
  }


  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl+ "tasklist/" +this.username )
  }

  addTask(task: any){
    // this.taskList.push(task);
    this.getTasks()
    return this.http.post(`${this.apiUrl}tasklist/${this.username}`, task )
  }

  login(username: string,password : string): Observable<any> {
    const loginData = {
      username,
      password
    }
    this.username = username;
    this.isAuthenticated = true;

    return this.http.post<any>(`${this.apiUrl}login` , loginData)
  }

  delete(index: any): Observable<any> {
    console.log(this.username)
    return this.http.delete(`${this.apiUrl}${this.username}/tasks/${index}`)
  }



  create(username: string, password: string): Observable<any> {
    const userData = {
      username,
      password
    }
    return this.http.post(`${this.apiUrl}register`,userData)
  }
}
