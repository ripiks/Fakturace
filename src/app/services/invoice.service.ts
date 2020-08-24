import { Injectable } from '@angular/core';
import { IInvoice, Invoice } from '../models/invoice';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoiceList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.invoiceList = firebase.list('invoices');
  }

getInvoices(){
  return this.invoiceList = this.firebase.list('invoices');
}

insertInvoice(invoice: IInvoice) {
  invoice.createdAt = new Date().toString();
  this.invoiceList.push(invoice);
}

updateInvoice(invoice: Invoice){
  this.invoiceList.update(invoice.$key, {

  });
}

deleteInvoice($key: string){
  this.invoiceList.remove($key);
}


}
