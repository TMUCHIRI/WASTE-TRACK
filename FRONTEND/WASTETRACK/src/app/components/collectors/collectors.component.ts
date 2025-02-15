import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollectorSidebarComponent } from './collector-sidebar/collector-sidebar.component';

@Component({
  selector: 'app-collectors',
  imports: [RouterOutlet, CommonModule, CollectorSidebarComponent],
  templateUrl: './collectors.component.html',
  styleUrl: './collectors.component.css'
})
export class CollectorsComponent {
  isActive: boolean = false;

  constructor(private sidebarService:SidebarService ){
    this.sidebarService.sidebarActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });

  }
}
