import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categogyList: Category[];

  constructor(private categoryService: CategoryService,  private submitType: CategoryComponent) { }

  ngOnInit() {
    this.categoryService.getCategories().snapshotChanges().subscribe(item =>{
      this.categogyList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.categogyList.push( x as Category);
      });
    });
  }

  onEdit(category: Category){
    this.categoryService.selectedCategory = Object.assign({}, category);
  }

  onDelete($key: string){
    this.categoryService.deleteCategory($key);
  }
}
