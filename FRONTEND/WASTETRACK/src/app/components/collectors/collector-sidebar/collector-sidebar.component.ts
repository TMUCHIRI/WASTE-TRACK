import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidebarService } from '../../../services/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collector-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './collector-sidebar.component.html',
  styleUrl: './collector-sidebar.component.css'
})
export class CollectorSidebarComponent {
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
