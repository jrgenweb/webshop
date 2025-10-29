import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStepper } from './card-stepper';

describe('CardStepper', () => {
  let component: CardStepper;
  let fixture: ComponentFixture<CardStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStepper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
