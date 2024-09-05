import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IPlayerInfo } from "../Interfaces/IPlayerInfo";


@Component({
  selector: 'app-party',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './party.component.html',
  styleUrl: './party.component.css'
})


export class PartyComponent {

  @Input() items: IPlayerInfo[] = [];

  @Output() playerChange = new EventEmitter();

  addItem() {
    if (this.items.length < 8) {
      this.items.push({name: '', level: 1});
      this.playerChange.emit();
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.playerChange.emit();
  }

  levelChange(){
    this.playerChange.emit();
  }
}
