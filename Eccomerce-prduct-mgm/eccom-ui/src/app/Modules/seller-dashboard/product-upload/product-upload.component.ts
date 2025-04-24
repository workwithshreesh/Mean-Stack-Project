import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css'],
})
export class ProductUploadComponent {
  formGroups: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
  
    if (target.files.length !== 1) {
      alert('Please select a single Excel file.');
      return;
    }
  
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      // First row is header, skip it
      this.formGroups = [];  // Clear any existing form groups
  
      data.slice(1).forEach((row: any) => {
        const group = this.fb.group({
          name: [row[0] || '', Validators.required],
          category: [row[1] || '', Validators.required],
          price: [row[2] || '', [Validators.required, Validators.min(1)]],
        });
  
        this.formGroups.push(group);
      });
  
      // Mark all form controls as touched to trigger validation immediately
      this.formGroups.forEach(group => {
        group.markAllAsTouched();
      });
    };
  
    reader.readAsBinaryString(target.files[0]);
  }
  

  getControl(group: FormGroup, field: string): FormControl {
    return group.get(field) as FormControl;
  }

  isInvalid(field: string, group: FormGroup): boolean {
    const control = group.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  submit() {
    if (this.formGroups.some(group => group.invalid)) {
      alert('Please fix the errors in the form!');
      this.formGroups.forEach(group => group.markAllAsTouched());
      return;
    }

    const data = this.formGroups.map(group => group.value);
    console.log('Form Submitted:', data);
    // Proceed with your API logic here
  }
}
