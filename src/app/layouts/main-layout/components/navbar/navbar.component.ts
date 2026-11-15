import { Component, inject, signal, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  
  // عشان نتحكم في فتح وقفل القائمة
  isDropdownOpen = signal<boolean>(false);

  // دالة فتح وقفل القائمة
  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }

  // دالة تسجيل الخروج
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isDropdownOpen.set(false);
    this.router.navigate(['/login']);
  }
}