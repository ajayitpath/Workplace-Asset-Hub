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
      const currentRoute = event.urlAfterRedirects.split('/')[2] || 'dashboard';
      this.activeMenuItem = currentRoute;
    });
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
