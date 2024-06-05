import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostConstraintsService {

  constructor(private http:HttpClient) { }

  postConstraints(formData: any) {
    this.http.post('https://localhost:7194/api/AgentProfile',formData)
      .subscribe(response => {
        console.log('Data sent successfully:', response);
      }, error => {
        console.error('Error sending data:', error);
      });
  }
}
