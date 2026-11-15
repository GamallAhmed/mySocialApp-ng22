import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  msgText = signal<string>('');
  successMsg = signal<string>('');

  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    },
  );

  sendLoginData(): void {
    if (this.loginForm.valid) {
      this.msgText.set('');
      this.successMsg.set('');

      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Success', res);

          this.successMsg.set('Login successful! Redirecting...');
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('user',JSON.stringify(res.data.user))
          setTimeout(() => {
            this.router.navigate(['/timeline']);
          }, 2000);
        },
        error: (err) => {
          console.log('Full Error Object:', err);
          this.msgText.set('Incorrect email or password');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
