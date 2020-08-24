import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerService } from './services/customer.service';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryService } from './services/category.service';

import { ProductComponent } from './products/product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsService, ProductService } from './services/product.service';

import { FakturyComponent } from './faktury/faktury.component';
import { InvoiceListComponent } from './faktury/invoice-list/invoice-list.component';
import { InvoiceComponent } from './faktury/invoice/invoice.component';
import { InvoiceService } from './services/invoice.service';
import { environment } from 'src/environments/environment';

const appRoutes: Routes = [
  {path: 'products',  component: ProductsComponent},
  {path: 'categories',  component: CategoriesComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'invoices',  component: FakturyComponent},
  {path: 'invoices-list', component: InvoiceListComponent},

  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
 ]
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryComponent,
    CustomersComponent,
    CustomerListComponent,
    CustomerComponent,
    FakturyComponent,
    InvoiceComponent,
    InvoiceListComponent,
    HomeComponent
  ],

  entryComponents: [
    CustomerComponent,
    ProductComponent,
    CategoryComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    ProductService,
    CategoryService,
    CustomerService,
    InvoiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
