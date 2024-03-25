import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationRouteComponent } from './conversation-route.component';

describe('ConversationRouteComponent', () => {
  let component: ConversationRouteComponent;
  let fixture: ComponentFixture<ConversationRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationRouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversationRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
