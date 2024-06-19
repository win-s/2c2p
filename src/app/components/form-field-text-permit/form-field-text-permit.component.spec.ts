import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldTextPermitComponent } from './form-field-text-permit.component';

describe('FormFieldTextPermitComponent', () => {
  let component: FormFieldTextPermitComponent;
  let fixture: ComponentFixture<FormFieldTextPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldTextPermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFieldTextPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
