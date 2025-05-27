import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const savedTheme = this.getTheme();
      this.applyTheme(savedTheme); // Apply theme on load
    }
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }

  setTheme(theme: 'light' | 'dark'): void {
    if (this.isBrowser) {
      this.applyTheme(theme);
      localStorage.setItem('theme', theme);
    }
  }

  getTheme(): 'light' | 'dark' {
    if (this.isBrowser) {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light'; // fallback for SSR
  }

  toggleTheme(): void {
    const current = this.getTheme();
    const newTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  
}
