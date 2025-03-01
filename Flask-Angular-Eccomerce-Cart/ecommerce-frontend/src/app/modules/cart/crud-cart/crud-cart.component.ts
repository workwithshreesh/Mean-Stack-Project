import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { MainService } from '../../../services/main.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-crud-cart',
  imports: [CommonModule],
  templateUrl: './crud-cart.component.html',
  styleUrl: './crud-cart.component.css'
})
export class CrudCartComponent implements OnInit, OnDestroy {


  deleteCartDataSubscribe!:Subscription
  retriveCartDataSubscribe!:Subscription

  allCart:any = [];
  allProduct:any = [];
  editCartId:any;
  deleteCartId:any;
  totalCartPrice:any
  Image_Url:any


  constructor(private cartService:CartService, 
              private mainService:MainService,
              ){}

  ngOnInit(): void {
    this.Image_Url = this.cartService.Image_Url
    this.getAllData();
    
  }


  ngOnDestroy(): void {

    if(this.retriveCartDataSubscribe){
      this.retriveCartDataSubscribe.unsubscribe()
    }

    if(this.deleteCartDataSubscribe){
      this.deleteCartDataSubscribe.unsubscribe()
    }
  
  }

  getAllData(){
    this.retriveCartDataSubscribe = this.cartService.getCartData().subscribe(data=>{
      this.allCart = data
      console.log(this.allCart)
      this.totalCartPrice = this.allCart.reduce((total: number, cart: any) => {
      return total + (cart?.product?.price || 0);
    }, 0);
    
    console.log(this.totalCartPrice)
    });

    
  }


  removeCart(productdata:any){
    console.log("delete",productdata.id)
    this.deleteCartDataSubscribe = this.cartService.deleteCartData(productdata.id).subscribe(data=>{
      console.log(data);
    });
    window.location.reload();
  }
}
