import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-threshold-encounter-tab',
  standalone: true,
  imports: [],
  templateUrl: './threshold-encounter-tab.component.html',
  styleUrl: './threshold-encounter-tab.component.css'
})
export class ThresholdEncounterTabComponent {
  @Input() PartyXpBudget: number[] = [];
}
