import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsDialog } from './add-products-dialog';

describe('AddProductsDialog', () => {
  let component: AddProductsDialog;
  let fixture: ComponentFixture<AddProductsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
