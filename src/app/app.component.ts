import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  authSubscription!: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.initAuthListener();
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
