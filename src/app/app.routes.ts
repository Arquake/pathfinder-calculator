import { Routes } from '@angular/router';
import {EncounterCalculatorComponent} from "./encounter-calculator/encounter-calculator.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    component: EncounterCalculatorComponent,
    data: {
      title: 'Pathfind Encounter Calculator',
      description: 'A simple Pathfinder 2E encounter calculator to create encounter relative to player\'s level'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];
