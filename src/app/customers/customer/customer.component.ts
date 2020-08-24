import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerList: Customer[];
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {

    this.customerService.getCustomer();
    this.resetForm();
    this.customerService.getCustomer().snapshotChanges().subscribe(item => {
      this.customerList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.customerList.push(x as Customer);
      });
    });
  }

  onSubmit(customerForm: NgForm){
    if (customerForm.value.$key === null) {
    this.customerService.insertCustomer(customerForm.value)
    }
    else {
    this.customerService.updateCustomer(customerForm.value);
    }
    this.resetForm(customerForm);
  }

  resetForm(customerForm?: NgForm)
  {
    if (customerForm != null) {
      customerForm.reset();
    }
    this.customerService.selectedCustomer = new Customer ();
  }

}
