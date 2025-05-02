import { Component, forwardRef, inject } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';

@Component({
  selector: 'app-chiled',
  standalone: true,
  imports: [],
  templateUrl: './chiled.component.html',
  styleUrl: './chiled.component.css'
})
export class ChiledComponent {

  data = inject(forwardRef(()=>ParentComponent));

  ngOnInit(){
    this.data.dataFunc()
  }

}
