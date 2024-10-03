import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormPageComponent } from './sign-up-form-page.component';

describe('SignUpFormPageComponent', () => {
  let component: SignUpFormPageComponent;
  let fixture: ComponentFixture<SignUpFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
