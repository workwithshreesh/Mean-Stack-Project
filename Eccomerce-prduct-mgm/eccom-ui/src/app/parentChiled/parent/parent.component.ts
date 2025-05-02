import { Component } from '@angular/core';
import { ChiledComponent } from '../chiled/chiled.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChiledComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

  dataFunc(){
    console.log("Hello World");
  }

  ngOnInit(){
    
  }


}
