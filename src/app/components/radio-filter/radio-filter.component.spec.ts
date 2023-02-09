import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioFilterComponent } from './radio-filter.component';

describe('RadioFilterComponent', () => {
  let component: RadioFilterComponent;
  let fixture: ComponentFixture<RadioFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
