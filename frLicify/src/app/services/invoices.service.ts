import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

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
    return this.http.get(this.URL + 'invoices')
  }





}
