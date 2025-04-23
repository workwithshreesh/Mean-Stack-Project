import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUploadComponent } from './product-upload.component';

describe('ProductUploadComponent', () => {
  let component: ProductUploadComponent;
  let fixture: ComponentFixture<ProductUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
