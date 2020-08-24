import { Customer } from './customer';
import { Product } from './product';

export class Invoice {
    $key: string;
    invnumber: number;
    customername: string;
    amount: number;
    status: string;
    invtotal: number;
    paymenttype: string;
}

export interface Purchase {
    product: Product;
    quantity: number;
    amount: number;
}

export interface IInvoice {
    $key?: string;
    invoiceNumber?: number;
    createdAt: string;
    uid?: string;
    customer: Customer;
    purchase: Purchase[];
    totalPrice: number;
    status?: string;
    paymentType: string;
}
