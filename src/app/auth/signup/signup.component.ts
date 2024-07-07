import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    age: new FormControl(''),
    weight: new FormControl(''),
  })

  constructor(private authService: AuthService, public router:Router) { }

  async onSubmit() {
    if(this.signUpForm.valid) {
      const email = this.signUpForm.get('email')?.value || '';
      const password = this.signUpForm.get('password')?.value || '';
      await this.authService.register(email, password);
    } else {
      alert('Form is invalid')
    }
  }
}
