import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  emailError: string = '';
  passwordError: string = '';
  isSubmitting: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  validateEmail(): void {
    if (!this.email.trim()) {
      this.emailError = 'Email is required.';
    } else if (!this.isValidEmail(this.email)) {
      this.emailError = 'Invalid email format.';
    } else {
      this.emailError = '';
    }
  }

  validatePassword(): void {
    if (!this.password.trim()) {
      this.passwordError = 'Password is required.';
    } else if (this.password.length < 6) {
      this.passwordError = 'At least 6 characters.';
    } else {
      this.passwordError = '';
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    return this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.password.length >= 6 &&
      this.isValidEmail(this.email) &&
      !this.emailError &&
      !this.passwordError;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.validateEmail();
    this.validatePassword();

    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      alert('Signed in! (demo)');
      // Reset form
      this.email = '';
      this.password = '';
      this.rememberMe = false;
      this.emailError = '';
      this.passwordError = '';
    }, 900);
  }
}
