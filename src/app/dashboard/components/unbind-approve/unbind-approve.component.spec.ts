import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbindApproveComponent } from './unbind-approve.component';

describe('UnbindApproveComponent', () => {
  let component: UnbindApproveComponent;
  let fixture: ComponentFixture<UnbindApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnbindApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbindApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
