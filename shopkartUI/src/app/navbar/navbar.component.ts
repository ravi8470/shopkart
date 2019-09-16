import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  categoryName: string;
  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = !!this.authService.currentUserValue;
  }
  goToCategory() {
    this.router.navigate([`category/${this.categoryName}`])
  }
  ngOnInit() {
    this.authService.currentUser.subscribe(data => {
      this.isLoggedIn = data ? true : false;
    })
  }

  logout() {
    this.authService.logout();
  }

}
