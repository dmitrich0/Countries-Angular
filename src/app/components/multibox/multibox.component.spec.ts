import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiboxComponent } from './multibox.component';

describe('MultiboxComponent', () => {
  let component: MultiboxComponent;
  let fixture: ComponentFixture<MultiboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
