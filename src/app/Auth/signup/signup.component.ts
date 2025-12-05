import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() switchToLogin = new EventEmitter<void>();

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeToTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  isSubmitting: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  validateName(): void {
    if (!this.name.trim()) {
      this.nameError = 'Name is required.';
    } else if (this.name.trim().length < 2) {
      this.nameError = 'Name must be at least 2 characters.';
    } else {
      this.nameError = '';
    }
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
    // Re-validate confirm password if it has a value
    if (this.confirmPassword) {
      this.validateConfirmPassword();
    }
  }

  validateConfirmPassword(): void {
    if (!this.confirmPassword.trim()) {
      this.confirmPasswordError = 'Please confirm your password.';
    } else if (this.confirmPassword !== this.password) {
      this.confirmPasswordError = 'Passwords do not match.';
    } else {
      this.confirmPasswordError = '';
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    return this.name.trim() !== '' &&
      this.name.trim().length >= 2 &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword &&
      this.isValidEmail(this.email) &&
      this.agreeToTerms &&
      !this.nameError &&
      !this.emailError &&
      !this.passwordError &&
      !this.confirmPasswordError;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSwitchToLogin(): void {
    this.switchToLogin.emit();
  }

  onSubmit(): void {
    this.validateName();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      alert('Account created! (demo)');
      // Reset form
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.agreeToTerms = false;
      this.nameError = '';
      this.emailError = '';
      this.passwordError = '';
      this.confirmPasswordError = '';
    }, 900);
  }
}
