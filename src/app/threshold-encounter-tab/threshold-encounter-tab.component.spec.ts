import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdEncounterTabComponent } from './threshold-encounter-tab.component';

describe('ThresholdEncounterTabComponent', () => {
  let component: ThresholdEncounterTabComponent;
  let fixture: ComponentFixture<ThresholdEncounterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThresholdEncounterTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThresholdEncounterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
