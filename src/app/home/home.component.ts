import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private product:ProductService) { }
  popularProducts:undefined|product[]
  trendyProducts:undefined|product[]
  ngOnInit(): void {
    this.loadPopularProduct();
    this.loadtrendyProduct();
  }
  loadPopularProduct(){
    this.product.popularProduct().subscribe((result)=>{
      this.popularProducts=result;
    })
  }
  loadtrendyProduct(){
    this.product.trendyProduct().subscribe((result)=>{
      this.trendyProducts=result;
    })
  }
}
