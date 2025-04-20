import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { MainService } from '../../services/main.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

    addCartDataSubscribe!:Subscription;
    editCartDataSubscribe!:Subscription;
    deleteCartDataSubscribe!:Subscription;
    retriveCartDataSubscribe!:Subscription;


    allDataProduct:any;
    Image_Url:any
    allDataCart:any
    cartExist:any

  constructor(private productService:ProductService,
              private mainService:MainService,
              private cartService:CartService
  ){}

  ngOnInit(): void {
    this.Image_Url = this.cartService.Image_Url
    this.getAllProduct()
    this.getAllCartData()
  }


  ngOnDestroy(): void {
    if(this.retriveCartDataSubscribe){
      this.retriveCartDataSubscribe.unsubscribe();
    }
    if(this.addCartDataSubscribe){
      this.addCartDataSubscribe.unsubscribe();
    }
  }


  getAllProduct(){
    this.retriveCartDataSubscribe =  this.productService.getProductdata().subscribe(data=>{
      this.allDataProduct = data
      console.log(data)
    })
  }

  postCartData(productdata: any) {
    console.log(this.allDataCart)
    if (productdata) {
      const cartExist = this.allDataCart.filter((cartdata: any) => 
        cartdata.product && productdata.id === cartdata.product.id
      );
      console.log(cartExist)
      if (cartExist.length > 0) { 
        alert("Product is already added");
      } else {
      this.addCartDataSubscribe =  this.cartService.postCartData({"product_id":productdata.id}).subscribe(response => {
          console.log("Product added to cart:", response);
        });
      }
    }

    window.location.reload()

  }
  
  getAllCartData(){
    this.cartService.getCartData().subscribe(data => {
      this.allDataCart = data;
    });
    console.log(this.allDataCart)
  }

  buyNow() {
    console.log("Product is bought");
    alert("Product is bought");
  }


  

}
