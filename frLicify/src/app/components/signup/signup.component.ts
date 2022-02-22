import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
  signUp() {
    this.authService.signUp(this.user).subscribe({
      next: (v: any) => {
        localStorage.setItem('token', v.token)
        this.router.navigate(['/invoices'])
      },
      error: (error) => { console.log(error) }
    }
    )
    console.log(this.user)

  }

}
