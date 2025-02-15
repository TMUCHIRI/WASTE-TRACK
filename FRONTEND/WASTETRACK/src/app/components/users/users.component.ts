import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet, CommonModule, UserSidebarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  isActive: boolean = false;

  constructor(private sidebarService:SidebarService ){
    this.sidebarService.sidebarActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });

  }

}
