import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
  role: string = '';
  agreeToTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';
  roleError: string = '';
  isSubmitting: boolean = false;

  passwordStrength: number = 0; // 0-4 (weak to strong)
  passwordStrengthText: string = '';

  roles = ['STUDENT', 'TEACHER', 'PARENT'];

  constructor(private authService: AuthService) { }

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
      this.passwordStrength = 0;
      this.passwordStrengthText = '';
    } else if (this.password.length < 6) {
      this.passwordError = 'At least 6 characters.';
      this.passwordStrength = 1;
      this.passwordStrengthText = 'Too weak';
    } else {
      this.passwordError = '';
      this.calculatePasswordStrength();
    }
    // Re-validate confirm password if it has a value
    if (this.confirmPassword) {
      this.validateConfirmPassword();
    }
  }

  calculatePasswordStrength(): void {
    let strength = 0;
    const password = this.password;

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Character variety checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++; // Mixed case
    if (/\d/.test(password)) strength++; // Numbers
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++; // Special chars

    // Cap at 4
    this.passwordStrength = Math.min(strength, 4);

    // Set text based on strength
    const strengthTexts = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    this.passwordStrengthText = strengthTexts[this.passwordStrength];
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

  validateRole(): void {
    if (!this.role) {
      this.roleError = 'Please select a role.';
    } else {
      this.roleError = '';
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
      this.role !== '' &&
      this.agreeToTerms &&
      !this.nameError &&
      !this.emailError &&
      !this.passwordError &&
      !this.confirmPasswordError &&
      !this.roleError;
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
    this.validateRole();

    if (!this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;

    // Call backend API
    const signupRequest = {
      username: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.signup(signupRequest).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        // Save token
        this.authService.saveToken(response.token);
        alert(`Account created successfully! Welcome, ${response.username}!`);
        // Reset form
        this.resetForm();
        // Close popup by switching to login (which will close)
        this.switchToLogin.emit();
      },
      error: (error) => {
        this.isSubmitting = false;
        const errorMessage = error.error?.message || error.message || 'Signup failed. Please try again.';
        alert(`Error: ${errorMessage}`);
      }
    });
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.role = '';
    this.agreeToTerms = false;
    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.roleError = '';
    this.passwordStrength = 0;
    this.passwordStrengthText = '';
  }
}
