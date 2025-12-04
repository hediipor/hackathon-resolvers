import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoginPopupOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  openLoginPopup(): void {
    this.isLoginPopupOpen = true;
  }

  closeLoginPopup(): void {
    this.isLoginPopupOpen = false;
  }

}
