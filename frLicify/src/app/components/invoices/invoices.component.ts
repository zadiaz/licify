import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices = []

  constructor(
    private service: InvoicesService
  ) { }

  ngOnInit(): void {
    this.service.getInvoices().subscribe({
      next: (v: any) => {
        this.invoices = v

      },
      error: (error) => {
        console.log(error)
      }
    })
  }



}
