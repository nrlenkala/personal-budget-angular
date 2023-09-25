import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = []; // The variable to store the fetched data
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}
  fetchDataIfNeeded(): void {
    if (this.data.length === 0) {
      this.http.get('http://localhost:3000/data').subscribe((response: any) => {
        this.data = response; // Store the fetched data
        this.dataSubject.next(this.data); // Update the BehaviorSubject
      });
    }
  }

  getData() : Observable<any[]> {
    return this.dataSubject.asObservable(); // This method provides data for your charts
  }
}
