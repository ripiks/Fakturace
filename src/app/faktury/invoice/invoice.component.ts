import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { CustomerService } from '../../services/customer.service';
import { ICustomer, IInvoice, Invoice, Customer } from '../../models';
import { CustomerComponent } from '../../customers/customer/customer.component';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  form: FormGroup;
  title = 'Přidej fakturu';
  phoneCustomer: '';
  addressCustomer: '';
  showDiv: true;
  customer: true;

  private selectUndefinedOptionValue: any;
  customerList: ICustomer[];

  constructor(private _fb: FormBuilder, private invoiceService: InvoiceService, private customerService: CustomerService) { }

  ngOnInit() {
    this.invoiceService.getInvoices().snapshot().subscribe(data => console.log(data.map(item => item.payload.toJSON() as IInvoice)));
    this.customerService.getCustomer().snapshotChanges().subscribe(data => {
      this.customerList = data.map( item => item.payload.toJSON() as ICustomer);
    });

    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      customer: [ null ],
      totalPrice: 0,
      purchases: this._fb.array([])
    });

    const myFormValueChanges$ = this.form.controls['tady bude asi cena'].valueChanges;
    myFormValueChanges$.subscribe(purchases => this.updatePurchaseAmount(purchases));
  }

  updatePurchaseAmount(purchase: any){
    const control =  this.form.controls['a zase ty ceny..'] as FormArray;
    let totalSum = 0;
    // tslint:disable-next-line: forin
    for ( const i in purchase) {
      const amount = (purchase [i].quantity * purchase[i].product.price);
      control.at(+i).get ('soucet').setValue(amount, {onlySelf: true, emitEvent: false});
      totalSum += amount;
    }
    this.form.get('totáááálka').setValue(totalSum);
  }

  purchaseForm(product?: Product): FormGroup {
    const numberPatern = '^[0-9.,]+$';
    return this._fb.group({
      product: [product],
      quantiry: [1],
      amount: [{value: 0, disabled: true}],
    });
  }

  money(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  }

  public addPurchase(product: Product): void {
    const control = this.form.controls['purchases'] as FormArray;

    let add = true;
    for (let i in control.controls) {
      if (control.at(+i).get('product').value.name === product.name) {
        control.at(+i).get('quantity').setValue(control.at(+i).get('quantity').value + 1);
        add = false;
      }
    }

    if (add) {
      control.push(this.purchaseForm(product));
      this.showDiv = add;
    }
  }

  private removePurchase(i: number): void {
    const control = this.form.controls['purchases'] as FormArray;
    control.removeAt(i);
  }

  resetPurchase(): void {
    this.form.controls['totalPrice'].setValue(0);
    const control = this.form.controls['purchases'] as FormArray;
    control.controls = [];

  }

  saveProduct() {
    if (this.form.valid && this.form.controls['totalPrice'].value > 0) {

      const result: IInvoice = this.form.value as IInvoice;
      console.log(result);
      this.invoiceService.insertInvoice(result);
      this.phoneCustomer = '';
      this.addressCustomer = '';
      this.showDiv = null;
    }
  }

  getSelectedOptionText(event) {
    this.resetPurchase();
    this.showDiv = null;
    this.phoneCustomer = event.phone;
    this.addressCustomer = event.address;
  }

}

