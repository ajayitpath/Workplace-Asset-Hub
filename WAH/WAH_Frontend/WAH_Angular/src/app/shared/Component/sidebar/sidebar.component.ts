import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isExpanded = false;
  activeMenuItem = 'dashboard';
constructor(private router: Router) {
  
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentRoute = event.urlAfterRedirects.split('/')[1] || 'dashboard';
      this.activeMenuItem = currentRoute;
    });
}
  menuItems = [
    { key: 'admin-dashboard', label: 'Dashboard', icon: 'pi pi-th-large' },
    { key: 'asset-management', label: 'Asset Management', icon: 'pi pi-briefcase' },
    { key: 'inventory-management', label: 'Inventory Management', icon: 'pi pi-box' },
    { key: 'asset-categories', label: 'Asset Categories', icon: 'pi pi-tags' },
    { key: 'requests-approvals', label: 'Requests & Approvals', icon: 'pi pi-check-square' },
    { key: 'notifications-reminders', label: 'Notifications & Reminders', icon: 'pi pi-bell' },
    { key: 'reports-analytics', label: 'Reports & Analytics', icon: 'pi pi-chart-bar' },
    { key: 'audit-logs', label: 'Audit Logs', icon: 'pi pi-file-edit' },
    { key: 'support-faq', label: 'Support & FAQ', icon: 'pi pi-question-circle' },
    { key: 'user-management', label: 'User Management', icon: 'pi pi-users' },
    { key: 'settings', label: 'Settings', icon: 'pi pi-cog' }
  ];

  expandSidebar() {
    this.isExpanded = true;
  }

  collapseSidebar() {
    this.isExpanded = false;
  }

  setActive(key: string) {
    this.activeMenuItem = key;
    this.router.navigate(['/dashboard/', key]);
  }

}
