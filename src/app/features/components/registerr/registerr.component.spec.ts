import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterrComponent } from './registerr.component';

describe('RegisterrComponent', () => {
  let component: RegisterrComponent;
  let fixture: ComponentFixture<RegisterrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterrComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
