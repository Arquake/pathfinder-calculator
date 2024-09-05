import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {IEnnemyInfo} from "../Interfaces/IEnnemyInfo";

@Component({
  selector: 'app-ennemy',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ennemy.component.html',
  styleUrl: './ennemy.component.css'
})
export class EnnemyComponent {

  @Input() items: IEnnemyInfo[] = [];

  @Output() ennemyChange = new EventEmitter();

  addItem() {
    if (this.items.length < 16) {
      this.items.push({cr: 1, count: 1, isElite: false, isWeak: false});
      this.ennemyChange.emit();
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.ennemyChange.emit();
  }

  countChange(){
    this.ennemyChange.emit();
  }

  crChange(){
    this.ennemyChange.emit();
  }

  eliteChange(i:number) {
    this.items[i].isElite = !this.items[i].isElite
    this.ennemyChange.emit();
  }

  weakChange(i:number){
    this.items[i].isWeak = !this.items[i].isWeak
    this.ennemyChange.emit();
  }

}
