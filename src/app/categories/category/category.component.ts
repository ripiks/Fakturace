import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().snapshotChanges().subscribe(item => {
      this.categoryList = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x.$key = element.key;
        this.categoryList.push(x as Category);
      });
    });
    this.categoryService.getCategories();
    this.resetForm();

  }

  onSubmit(categoryForm: NgForm){
    if (categoryForm.value.$key === null) {
       this.categoryService.insertCategory(categoryForm.value);
    }
    else {
      this.categoryService.updateCategory(categoryForm.value);
    }
    this.resetForm(categoryForm);

  }

  resetForm(categoryForm?: NgForm)
  {
    if (categoryForm != null) {
      categoryForm.reset();
    }
    this.categoryService.selectedCategory = new Category();
  }

}
