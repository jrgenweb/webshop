import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgGallery } from './img-gallery';

describe('ImgGallery', () => {
  let component: ImgGallery;
  let fixture: ComponentFixture<ImgGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
