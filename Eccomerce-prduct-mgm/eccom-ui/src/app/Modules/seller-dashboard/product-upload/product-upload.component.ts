import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

interface ProductRow {
  name: string;
  category: string;
  price: number;
  errors?: { [key: string]: string };
}

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrl: './product-upload.component.css'
})
export class ProductUploadComponent {
  productData: ProductRow[] = [];

  onFileUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws, { defval: '' }) as ProductRow[];

      this.productData = data.map(row => ({
        ...row,
        errors: this.validateRow(row)
      }));
    };
    reader.readAsBinaryString(file);
  }

  validateRow(row: ProductRow): any {
    const errors: any = {};
    if (!row.name || row.name.length < 2) errors.name = 'Name required';
    if (!row.category) errors.category = 'Category required';
    if (!row.price || row.price <= 0) errors.price = 'Invalid price';
    return errors;
  }

  hasError(row: ProductRow, field: string): boolean {
    return !!row.errors?.[field];
  }

}
