import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PartyComponent } from "./party/party.component";
import { EnnemyComponent } from "./ennemy/ennemy.component";
import { HazardComponent } from "./hazard/hazard.component";
import { IPlayerInfo } from "./Interfaces/IPlayerInfo"
import { IEnnemyInfo } from "./Interfaces/IEnnemyInfo";
import {IMonsterCr} from "./Interfaces/IMonsterCr";
import {ThresholdEncounterTabComponent} from "./threshold-encounter-tab/threshold-encounter-tab.component";
import {IHazardInfo} from "./Interfaces/IHazard";
import {IHazardCr} from "./Interfaces/IHazardCr";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PartyComponent, EnnemyComponent, HazardComponent, ThresholdEncounterTabComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {}

  title = 'pathfinder-calculator';

  playerItems: IPlayerInfo[] = [];
  ennemyItems: IEnnemyInfo[] = [];
  hazardItems: IHazardInfo[] = [];

  monsterXpThreshold: IMonsterCr = {"-4":10, "-3":15, "-2":20, "-1":30, "0":40, "1":60, "2":80, "3":120, "4":160};
  simpleHazardXpThreshold: IHazardCr = {"-4":2, "-3":3, "-2":4, "-1":6, "0":8, "1":12, "2":16, "3":24, "4":30}
  complexHazardXpThreshold: IHazardCr = {"-4":10, "-3":15, "-2":20, "-1":30, "0":40, "1":60, "2":80, "3":120, "4":150}

  partyDifficultyBudget: number[] = [10, 15, 20, 30, 40];

  currentPartyXpBudgetAdjusted: number[] = [0, 0, 0, 0, 0];

  partyLevel: number = 0;
  ennemyXp: number = 0;
  threatType: number = 6
  validThreat: boolean = true;

  /**
   * min -1, max 96

  translateX: number = -1;
   */

  calculatePartyLevel() {
    this.partyLevel = 0
    if(this.playerItems.length > 0){
      this.playerItems.forEach(item => {
        this.partyLevel += item.level;
      })
      this.partyLevel = Math.round(this.partyLevel / this.playerItems.length);
    }

    this.calculateThresholds()

    this.calculateDifficulty()
  }

  calculateDifficulty(){
    this.ennemyXp = 0;
    try {
      this.ennemyItems.forEach(item => {
        let ennemyCr = item.cr
        if (item.isElite) {
          if (ennemyCr === -1 || ennemyCr === 0){
            ennemyCr++
          }
          ennemyCr++
        }

        if (item.isWeak) {
          if (ennemyCr === 1){
            ennemyCr--
          }
          ennemyCr--
        }

        this.ennemyXp += this.getMonsterXpTreshold(ennemyCr - this.partyLevel) * item.count
        if (isNaN(this.ennemyXp)) { throw new DOMException("No ennemy xp possible.") }
      })


      this.hazardItems.forEach(item => {
        this.ennemyXp += this.getHazarsXpTreshold(item.cr - this.partyLevel, item.isComplex) * item.count
        if (isNaN(this.ennemyXp)) { throw new DOMException("No hazard xp possible.") }
      })

      this.setThreatType()
      this.validThreat = true;

    } catch (e) {
      this.validThreat = false;
    }

  }

  /**
   * take the monster cr and return the xp that it should give
   * @param cr the cr of the monster
   * @return the xp amount that the monster should give
   */
  getMonsterXpTreshold(cr: number) {
    return this.monsterXpThreshold[cr]
  }

  /**
   * calculate the threat type of the encounter :
   * 0: Trivial
   * 1: Low
   * 2: Moderate
   * 3: Severe
   * 4: Extreme
   * 5: impossible encounter
   */
  setThreatType() {
    if (this.playerItems.length === 0 || this.ennemyXp === 0) {
      this.threatType = 5
      /*this.setTranslateArrow(1, 0)*/
      return
    }

    for (let i = 0; i < 4; i++) {
      if ( this.ennemyXp <= this.currentPartyXpBudgetAdjusted[i] ) {
        this.threatType = i
        return
      }
    }
    this.threatType = 4

    /**if (i === 5) {
      this.setTranslateArrow(1, 6);
      this.threatType = 4
      return
    }
     else if (i === 0) {
      this.setTranslateArrow((this.ennemyXp / this.partyXpBudgetAdjusted), 1);
      this.threatType = 0
      return
    }
    else {
      let previousThreatXpMax = this.partyDifficultyBudget[i-1] * playerCount + playerBaseDifference * this.playerCountDifferencesBudget[i];

      let ennemyXpNoExcess = this.ennemyXp - previousThreatXpMax;

      let xpBetweenThreatLevels = this.partyXpBudgetAdjusted - previousThreatXpMax;

      this.setTranslateArrow((ennemyXpNoExcess/xpBetweenThreatLevels), i + 1);

    }
     */

  }

  /**
   * calculate the adjusted party xp budget
   */
  calculateThresholds() {
    this.currentPartyXpBudgetAdjusted = []
    const playerCount = this.playerItems.length;
    const playerBaseDifference = this.playerItems.length - 4;
    for (let i = 0; i < 5; i++) {
      this.currentPartyXpBudgetAdjusted.push(this.partyDifficultyBudget[i] * playerCount)
    }
  }


  /**
   * take the cr and complexity of a hazard and return his xp value
   * @param cr the CR of the hazard
   * @param isComplex is the hazard is complex or not
   */
  getHazarsXpTreshold(cr: number, isComplex: boolean) {
    if (isComplex) {
      return this.complexHazardXpThreshold[cr]
    }
    return this.simpleHazardXpThreshold[cr]
  }

  /**
  setTranslateArrow(percentage: number, section: number) {
    if (percentage === 1 ) {
      switch (section) {
        // far left
        case 0:
          this.translateX = -1;
          break;
        // trivial limit
        case 1:
          this.translateX = 17.6;
          break;
        // low limit
        case 2:
          this.translateX = 37.6;
          break;
        // moderate limit
        case 3:
          this.translateX = 57.6;
          break;
        // severe limit
        case 4:
          this.translateX = 77.6;
          break;
        // deadly limit
        case 5:
          this.translateX = 96;
          break;
        // far right
        default:
          this.translateX = 96;
          break;
      }
    } else {
      this.translateX = percentage * (97/5) + (97/5 * (section-1)) - 1
    }
  }*/
}
