import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder=inject(FormBuilder)
  
  msgText = signal<string>("");
  successMsg = signal<string>("");
  registerForm=this.formBuilder.group({
      name:['', [Validators.required, Validators.minLength(3)]],
      username:[''],
      dateOfBirth:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      gender:['', [Validators.required]],
      password:['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      rePassword:['', [Validators.required]]
  }, { validators:this.confirmPassword})
 
  //confirm password function
  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (password !== rePassword) {
      return { mismatch: true }; 
    } 
    else{
        return null;
    }
    
    
  }
  sendRegisterData(): void {
    if (this.registerForm.valid) {
      this.msgText.set('');

      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Success', res);
          this.successMsg.set('Account created successfully! Redirecting to login...');

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.log('Full Error Object:', err); // عشان تشوف الإيرور كامل في الكونسول
          
          // 2. استخراج الرسالة بشكل آمن
          let serverMessage = 'An error occurred. Please try again.';
          
          if (err.error) {
            // لو السيرفر باعت string مباشرة
            if (typeof err.error === 'string') {
              serverMessage = err.error;
            } 
            // لو السيرفر باعت object فيه message
            else if (err.error.message) {
              serverMessage = err.error.message;
            }
          }

          // 3. ترجمة رسالة الـ username
          if (serverMessage.includes('username')) {
            this.msgText.set('Username can only contain small letters, numbers, and underscores (_), with no spaces (3 to 30 characters).');
          } else {
            this.msgText.set(serverMessage);
          }
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}