import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailFormComponent } from './fail-form.component';

describe('FailFormComponent', () => {
  let component: FailFormComponent;
  let fixture: ComponentFixture<FailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
