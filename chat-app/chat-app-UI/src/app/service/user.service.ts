import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  // Search for users by username
  searchUser(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: { username }
    });
  }
  

  // Get all users (optional utility)
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

 

}
