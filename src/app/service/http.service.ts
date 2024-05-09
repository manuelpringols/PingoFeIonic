import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  

  constructor(private http:HttpClient) { }

  apiUrl="http://localhost:8080/api/ping"

  apiUrlMongo="http://localhost:8080/api/pingosocial"

// 
  getPing():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getPing`);

  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletePings/${id}`);
  }

  IndexPings(array:any[]){
      for(let ping of array){
       
      }
        return Object.keys(array)
  }

  addMongoPing(ping:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrlMongo}/addPingoSocial`,ping);
  }

  addPing(ping: any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addPings`,ping);
  }

  addLikePing(id:number){
    return this.http.patch<any>(`${this.apiUrlMongo}/incrementLike/${id}`,id);
  }

  addDisLikePing(id:number){
    return this.http.patch<any>(`${this.apiUrlMongo}/incrementDislike/${id}`,id);
  }

}
