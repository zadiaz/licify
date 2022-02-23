import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Invoice } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  private URL = 'http://localhost:5001/api/'

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getInvoices() {
    return this.http.get<Invoice[]>(this.URL + 'invoices')
  }
  getInvoice(iid: String) {
    return this.http.get<Invoice>(this.URL + 'invoices/' + iid)
  }
  createInvoice(invoice: any) {
    return this.http.post<Invoice>(this.URL + 'invoices', invoice)
  }
  updateInvoice(invoice: Invoice) {
    return this.http.put<Invoice>(this.URL + 'invoices', invoice)
  }





}
