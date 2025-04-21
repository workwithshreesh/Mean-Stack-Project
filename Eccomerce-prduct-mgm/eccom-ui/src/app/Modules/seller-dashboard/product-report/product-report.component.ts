import { Component } from '@angular/core';
import { ReportService } from '../../../Services/report.service';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.css'
})
export class ProductReportComponent {

  reportData: any[] = [];

  constructor(
    private reportService: ReportService
  ){}

  generateReport() {
    this.reportService.getReportData().subscribe(data => {
      this.reportData = data;
    });
  }


  downloadCSV() {
    this.reportService.downloadAsCSV(this.reportData, 'seller-report');
  }

  downloadExcel(){
    this.reportService.downloadAsExcel(this.reportData, 'seller-report');
  }

}
