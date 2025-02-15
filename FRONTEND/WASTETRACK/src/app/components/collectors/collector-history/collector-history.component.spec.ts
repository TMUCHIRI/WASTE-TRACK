import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorHistoryComponent } from './collector-history.component';

describe('CollectorHistoryComponent', () => {
  let component: CollectorHistoryComponent;
  let fixture: ComponentFixture<CollectorHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectorHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
