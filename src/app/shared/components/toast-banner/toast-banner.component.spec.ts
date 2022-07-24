import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastBannerComponent } from './toast-banner.component';

describe('ToastBannerComponent', () => {
  let component: ToastBannerComponent;
  let fixture: ComponentFixture<ToastBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
