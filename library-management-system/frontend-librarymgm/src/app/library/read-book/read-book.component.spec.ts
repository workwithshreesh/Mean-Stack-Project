import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBookComponent } from './read-book.component';

describe('ReadBookComponent', () => {
  let component: ReadBookComponent;
  let fixture: ComponentFixture<ReadBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
