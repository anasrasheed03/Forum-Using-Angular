import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AutoFetchService {
    public fetch:BehaviorSubject<any> = new BehaviorSubject(true);
  getFetch() {
    return this.fetch.asObservable();
    }

  saveFetch(value) {
    this.fetch.next(value);
  }


}
