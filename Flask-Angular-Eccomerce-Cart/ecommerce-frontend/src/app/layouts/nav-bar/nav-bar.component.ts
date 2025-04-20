import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  routerEvent!:Subscription
  isCart:boolean = false;

  constructor(private router:Router){}

  ngOnInit(): void {
    // this.routerEvent = this.router.events.subscribe(()=>{
    //   this.isCart = this.router.url === "/cart"
    // });
  }


  // ngOnDestroy(): void {
  //   if(this.routerEvent){
  //     this.routerEvent.unsubscribe()
  //   }
  // }
}
