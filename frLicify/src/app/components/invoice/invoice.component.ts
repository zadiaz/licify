import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import { Item } from 'src/app/models/item';
import { InvoicesService } from 'src/app/services/invoices.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {



  iid = null
  item = {
    qty: 1,
    desc: '',
    tax: 0,
    price: 1,
  }
  invoice: Invoice | undefined

  constructor(private service: InvoicesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(params => {
        this.iid = params['id'];
        if (this.iid) {
          this.service.getInvoice(this.iid).subscribe({
            next: (v: Invoice) => {
              this.invoice = <Invoice>v
            },
            error: (error) => {
              console.log(error)
            }
          })

        }
      })


  }
  addItem() {
    this.invoice?.items.push(this.item)
    this.item = {
      qty: 1,
      desc: '',
      tax: 0,
      price: 1,
    }
    this.update()

  }
  deleteItem(item: Item) {
    if (this.invoice) {
      this.invoice.items = this.invoice.items.filter(i => i != item);
    }
    this.update()

  }
  update() {
    if (this.invoice) {
      this.invoice.total = this.total()
      this.invoice.taxes = this.taxes()

      this.service.updateInvoice(this.invoice).subscribe({
        next: (v: Invoice) => {

        },
        error: (error) => {
          console.log(error)
        }
      })
    }

  }
  pagar() {
    if (this.invoice) {
      this.invoice.status = 200
      this.update()
    }
  }
  eliminar() {
    if (this.invoice) {
      this.invoice.status = 300
      this.update()
    }

  }

  total() {
    let t = 0

    if (this.invoice) {
      for (let i = 0; i < this.invoice.items.length; i++) {
        t += this.invoice.items[i].price * this.invoice.items[i].qty
      }
    }
    return t

  }
  taxes() {
    let t = 0

    if (this.invoice) {
      for (let i = 0; i < this.invoice.items.length; i++) {
        t += this.invoice.items[i].tax * this.invoice.items[i].qty
      }
    }
    return t

  }
  status() {
    let r = ''
    if (this.invoice?.status == 100) {
      r = 'No Pagada'
    } else if (this.invoice?.status == 200) {
      r = 'Pagada'
    } else if (this.invoice?.status == 400) {
      r = 'Eliminada'
    }
    return r
  }


}
