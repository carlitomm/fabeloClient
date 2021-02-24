import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PojectDetailsComponent } from './poject-details.component';

describe('PojectDetailsComponent', () => {
  let component: PojectDetailsComponent;
  let fixture: ComponentFixture<PojectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PojectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PojectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
