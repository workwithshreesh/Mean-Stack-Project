import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  bookData = signal<Object | null>(null);

  constructor() {}


}
