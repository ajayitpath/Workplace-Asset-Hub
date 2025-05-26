import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormdataService {

  constructor() { }
    private formData: any;

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  clearFormData() {
    this.formData = null;
  }
}
