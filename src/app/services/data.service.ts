import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getData(): any {
    return new Promise((resolve, reject) => {
        fetch('/assets/freeformatter-out.json')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}


}
