import { Component } from '@angular/core';
import { AssetrequestapproveService } from './services/assetrequestapprove.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AssetRequestCreateDto, AssetRequestDto } from '../../shared/Model/assetrequestapprove';

@Component({
  selector: 'app-requestapproval',
  standalone: false,
  templateUrl: './requestapproval.component.html',
  styleUrl: './requestapproval.component.css'
})
export class RequestapprovalComponent {
  onAddCategory() {
    this.isEditMode = false;
    this.selectedCategory = null;
    this.showForm = true;
  }
  assetRequests: AssetRequestDto[] = [];
  filteredRequests: AssetRequestDto[] = [];
  searchText: string = '';
  loading = false;
  selectedRequest: AssetRequestDto | null = null;
  viewRequest: any | null = null;
  showViewDialog: boolean = false;
  showForm: boolean = false;
  isEditMode: boolean = false;
  selectedCategory: AssetRequestCreateDto | null = null;

  columns = [
    { field: 'AssetName', header: 'Asset Name' },
    { field: 'UserName', header: 'Requested By' },
    { field: 'QuantityRequested', header: 'Quantity' },
    { field: 'Status', header: 'Status' },
    { field: 'RequestedAt', header: 'Requested At' },
  ];

  constructor(
    private requestService: AssetrequestapproveService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.requestService.getAllRequests().subscribe({
      next: (data: AssetRequestDto[]) => {
        this.assetRequests = data;
        this.filteredRequests = data;
        this.loading = false;
        console.log('Asset requests loaded:', data);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    const text = this.searchText.toLowerCase();
    this.filteredRequests = this.assetRequests.filter(
      req =>
        req.assetName.toLowerCase().includes(text) ||
        req.userName.toLowerCase().includes(text)
    );
  }

  onToggleStatus(rowData: any): void {
    const newStatus = rowData.Status === 'Approved' ? 'Rejected' : 'Approved';
    const requestId = rowData.RequestId;
    console.log('Toggling status for request:', requestId, 'to', newStatus);
    this.confirmationService.confirm({
      message: `Are you sure you want to ${newStatus.toLowerCase()} this request?`,
      accept: () => {
        this.requestService.updateStatus(requestId, newStatus).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: `${newStatus} Successfully` });
            this.loadRequests();
          },
          error: () => {
            this.loadRequests();
          }
        });
      },
      reject: () => {
        // revert toggle UI change if user cancels
        this.loadRequests();
      }
    });
  }

  onView(request: AssetRequestDto): void {
    this.viewRequest = request;
    this.showViewDialog = true;
  }
  onFormClose() {
    this.showForm = false;
    this.selectedCategory = null;
  }

  onFormSubmit() {
    this.showForm = false;
    this.loadRequests();  // refresh the list after submit
  }
}
