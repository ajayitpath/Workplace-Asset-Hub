import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
   isExpanded = true;
  activeMenuItem = 'dashboard';

  // Sample data for dashboard widgets
  dashboardData = {
    totalAssets: 156,
    assetsInUse: 134,
    underMaintenance: 12,
    totalInventoryItems: 89,
    pendingRequests: 7,
  };

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentRoute = event.urlAfterRedirects.split('/')[1] || 'dashboard';
      this.activeMenuItem = currentRoute;
    });
  }

  menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'pi pi-th-large' },
    { key: 'asset-management', label: 'Asset Management', icon: 'pi pi-briefcase' },
    { key: 'inventory-management', label: 'Inventory Management', icon: 'pi pi-box' },
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
    this.router.navigate(['/admin-dashboard/', key]);
  }

  addNewAsset() {
    this.router.navigate(['/admin-dashboard/asset-management/add']);
  }

  addInventory() {
    this.router.navigate(['/admin-dashboard/inventory-management/add']);
  }

  viewPendingRequests() {
    this.router.navigate(['/admin-dashboard/requests-approvals']);
  }

  generateReport() {
    this.router.navigate(['/admin-dashboard/reports-analytics']);
  }

  configureNotifications() {
    this.router.navigate(['/admin-dashboard/notifications-reminders']);
  }
}
