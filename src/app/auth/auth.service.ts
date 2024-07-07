import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  constructor(private route: Router, private auth: Auth, private ngZone: NgZone) { }

  get isUserAuthenticated() {
    return this.isAuthenticated;
  }

  initAuthListener() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User is logged in');
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.ngZone.run(() => {
          this.route.navigate(['/']);
        });
      } else {
        console.log('User is not logged in');
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.ngZone.run(() => {
          this.route.navigate(['/auth/login']);
        });
      }
    });
  }

  async login(email:string, password:string) {
    await signInWithEmailAndPassword(this.auth, email, password).then(
      (res) => {
        console.log('Login successful', res);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  async register(email:string, password:string) {
    await createUserWithEmailAndPassword(this.auth, email, password).then(
      (res) => {
        console.log('User created successfully', res);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  logout() {
    this.auth.signOut();
  }

}
