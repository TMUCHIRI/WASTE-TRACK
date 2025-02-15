import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  isActive: boolean = false;

  constructor(private sidebarService: SidebarService, private router: Router) {
    this.sidebarService.sidebarActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    // this.localstorageService.removeItem('user_id');
    // this.localstorageService.removeItem('token');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
