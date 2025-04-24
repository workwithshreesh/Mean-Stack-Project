import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { CategoryService } from '../../../Services/category.service';
import { ProductService } from '../../../Services/product.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css'],
})
export class ProductUploadComponent {
  formGroups: FormGroup[] = [];
  categoryData: any;
  categorySubscribtion!: Subscription;

  userIds: any;
  errorFalgMessage:any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private authService : AuthService
  ) {}

  ngOnInit() {
    this.getCategorys();
  }

  getCategorys() {
    this.categorySubscribtion = this.categoryService
      .getCategoryByUserIdForm()
      .subscribe((data: any) => {
        this.categoryData = data.category;
        console.log(this.categoryData);
      });
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    console.log("target", target);
    if (target.files.length !== 1) {
      alert('Please select a single Excel file.');
      return;
    }

    const reader: FileReader = new FileReader();
    

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      console.log("excel workbook",wb)
      const wsname: string = wb.SheetNames[0];
      console.log("wsname", wsname);
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      console.log("ws",ws)

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log("data",data)

      this.formGroups = [];

      const categoryNames = this.categoryData.map((c: any) => c.name.toLowerCase());
      console.log("categoryNames", categoryNames)
      console.log("data slice",data[0])
      data.slice(1).forEach((row: any) => {
        const group = this.fb.group({
          name: [row[0] || '', Validators.required],
          category: [
            row[1] || '',
            [
              Validators.required,
              (control: FormControl) =>
                categoryNames.includes(control.value.trim().toLowerCase())
                  ? null
                  : { invalidCategory: true },
            ],
          ],
          price: [
            row[2] || '',
            [
              Validators.required,
              Validators.min(1),
              Validators.pattern(/^\d+(\.\d{1,2})?$/),
            ],
          ],
        });

        this.formGroups.push(group);
      });

      this.formGroups.forEach((group) => group.markAllAsTouched());
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

  addRow() {
    const group = this.fb.group({
      name: ['', Validators.required],
      category: ['', [
        Validators.required,
        (control: FormControl) => {
          const categoryNames = this.categoryData.map((c: any) => c.name.toLowerCase());
          return categoryNames.includes(control.value.trim().toLowerCase())
            ? null
            : { invalidCategory: true };
        }
      ]],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  
    this.formGroups.push(group);
  }
  
  

  deleteRow(index: number) {
    this.formGroups.splice(index, 1);
  }

  submit() {
    if (this.formGroups.some((group) => group.invalid)) {
      alert('Please fix the errors in the form!');
      this.formGroups.forEach((group) => group.markAllAsTouched());
      return;
    }

    const data = this.formGroups.map((group) => group.value);
    console.log('Form Submitted:', data);
    // Submit API logic here

    this.userIds = this.authService.getUserId() || '';
    console.log("userid", this.userIds)
    this.productService.createBulkProduct(data, this.userIds).subscribe({
      next: (response: any) => {
        this.errorFalgMessage = "Bulk data is submited!"
        //  Clear the form groups
      this.formGroups = [];

      // Optional: Reset the file input if used
      const fileInput = document.getElementById('excelFileInput') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      },
      error: (err) => {
        this.errorFalgMessage = "Bulk data is not submited!"
      }
    })
  }
}
