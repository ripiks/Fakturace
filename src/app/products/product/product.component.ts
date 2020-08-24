import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {ProductService} from '../..//services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  private selectUndefinedOptionValue: any;

categoryList: Category[];
  constructor(private productService: ProductService, private categoryService: CategoryService, private modal: Modal) { }

  ngOnInit() {

    this.productService.getProducts();
    this.resetForm();
    this.categoryService.getCategories().snapshotChanges().subscribe(item =>{
      this.categoryList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.categoryList.push(x as Category);
      });
    });
  }

  onSubmit(productForm: NgForm){
    if (productForm.value.$key == null) {
      this.productService.insertProduct(productForm.value);
    }
    else {
      this.productService.updateProduct(productForm.value);
    }
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm)
  {
    if (productForm != null) {
      productForm.reset();
    }
    this.productService.selectedProduct = new Product();
  }

}
