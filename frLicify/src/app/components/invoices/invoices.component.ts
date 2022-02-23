import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[] | undefined

  ope = 'eq'
  fie = 'number'
  val = 0
  des = ''
  est = 100



  constructor(
    private service: InvoicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.service.getInvoices().subscribe({
      next: (v: any) => {
        this.invoices = v
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  createInvoice() {
    this.service.createInvoice({}).subscribe({
      next: (v: any) => {
        this.invoices?.push(v)
        this.router.navigate(['/invoice/' + v._id])

      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  filter() {


    if (this.fie != 'status' && this.fie != 'desc') {

      if (this.fie == 'number') {
        this.invoices = this.invoices?.filter(i => this.ope == 'lt' ? i.number <= this.val : this.ope == 'gt' ? i.number >= this.val : i.number == this.val)

      } else if (this.fie == 'total') {
        this.invoices = this.invoices?.filter(i => this.ope == 'lt' ? i.total <= this.val : this.ope == 'gt' ? i.total >= this.val : i.total == this.val)

      }
      else if (this.fie == 'taxes') {
        this.invoices = this.invoices?.filter(i => this.ope == 'lt' ? i.taxes <= this.val : this.ope == 'gt' ? i.taxes >= this.val : i.taxes == this.val)

      }
    } else if (this.fie == 'status') {
      this.invoices = this.invoices?.filter(i => i.status == this.est)
    }
    else if (this.fie == 'desc') {
      this.invoices = this.invoices?.filter(i => i.items.filter(it => it.desc.toLowerCase().includes(this.des.toLowerCase())).length > 0)
    }



  }



}
