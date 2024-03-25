import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestahaComponent } from './testaha.component';

describe('TestahaComponent', () => {
  let component: TestahaComponent;
  let fixture: ComponentFixture<TestahaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestahaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestahaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
