import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IHazardInfo} from "../Interfaces/IHazard";

@Component({
  selector: 'app-hazard',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        CommonModule
    ],
  templateUrl: './hazard.component.html',
  styleUrl: './hazard.component.css'
})
export class HazardComponent {
  @Input() items: IHazardInfo[] = [];

  @Output() hazardChange = new EventEmitter();

  addItem() {
    if (this.items.length < 16) {
      this.items.push({cr: 1, count: 1, isComplex: false});
      this.hazardChange.emit();
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.hazardChange.emit();
  }

  countChange(){
    this.hazardChange.emit();
  }

  crChange(){
    this.hazardChange.emit();
  }

  isComplex(i: number){
    this.items[i].isComplex = !this.items[i].isComplex;
    this.hazardChange.emit();
  }
}
