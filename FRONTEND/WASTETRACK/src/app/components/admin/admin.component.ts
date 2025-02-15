import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, CommonModule, AdminSidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
isActive: boolean = false;

  constructor(private sidebarService:SidebarService ){
    this.sidebarService.sidebarActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });

  }
}
