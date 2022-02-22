import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    number: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  signIn() {
    this.authService.signIn(this.user).subscribe({
      next: (v: any) => {
        localStorage.setItem('token', v.token);
        this.router.navigate(['/invoices'])
      },
      error: (error) => { console.log(error) }
    }
    )
    console.log(this.user)

  }

}
