import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFormComponent } from './success-form.component';

describe('SuccessFormComponent', () => {
  let component: SuccessFormComponent;
  let fixture: ComponentFixture<SuccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
