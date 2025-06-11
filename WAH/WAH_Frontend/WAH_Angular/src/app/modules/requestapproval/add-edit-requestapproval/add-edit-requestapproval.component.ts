import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetRequestCreateDto } from '../../../shared/Model/assetrequestapprove';
import { AssetrequestapproveService } from '../services/assetrequestapprove.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-requestapproval',
  standalone: false,
  templateUrl: './add-edit-requestapproval.component.html',
  styleUrl: './add-edit-requestapproval.component.css'
})
export class AddEditRequestapprovalComponent {
  @Input() isEditMode = false;
  @Input() requestData: AssetRequestCreateDto | null = null;
  @Output() formClose = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<void>();
  requestForm!: FormGroup;

  constructor(private fb: FormBuilder, private assetRequestService: AssetrequestapproveService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      assetId: [this.requestData?.assetId || '', Validators.required],
      userId: [this.requestData?.userId || '', Validators.required],
      quantityRequested: [this.requestData?.quantityRequested || 1, [Validators.required, Validators.min(1)]]
    });
  }

  submitRequest(): void {
    if (this.requestForm.valid) {
      const requestData: AssetRequestCreateDto = this.requestForm.value;
      console.log('Submitting Request:', requestData);

      this.assetRequestService.createRequest(requestData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request submitted successfully!' });
          this.formSubmit.emit();
          this.closeForm();
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to submit request.' });
        }
      });
    }
  }
  closeForm() {
    this.formClose.emit();
  }
}
