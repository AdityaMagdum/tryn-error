import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetConstraintsService {
  private apiUrl = 'https://localhost:7194/api/AllConstraints';
  constructor(private http: HttpClient) {}

  getPhoneConstraints()
  {
    return this.http.get(this.apiUrl);
  }
}
