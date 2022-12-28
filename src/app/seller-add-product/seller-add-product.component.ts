import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {}
  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product is successfully added';

        this.router.navigate(['/seller-home']);
      }

    });
    // setTimeout(()=>{
    //   this.addProductMessage=undefined;

    //  },3000);
  }

}
