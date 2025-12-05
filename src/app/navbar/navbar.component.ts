import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoginPopupOpen = false;
  isSignupPopupOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  openLoginPopup(): void {
    this.isLoginPopupOpen = true;
    this.isSignupPopupOpen = false;
  }

  openSignupPopup(): void {
    this.isSignupPopupOpen = true;
    this.isLoginPopupOpen = false;
  }

  closeLoginPopup(): void {
    this.isLoginPopupOpen = false;
  }

  closeSignupPopup(): void {
    this.isSignupPopupOpen = false;
  }

  switchToSignup(): void {
    this.isLoginPopupOpen = false;
    this.isSignupPopupOpen = true;
  }

  switchToLogin(): void {
    this.isSignupPopupOpen = false;
    this.isLoginPopupOpen = true;
  }

}
