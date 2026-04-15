import { Routes } from '@angular/router';
import { VerbDrillComponent } from './Pages/verb-drill/verb-drill.component';
import { VerbSettingsComponent } from './Pages/verb-settings/verb-settings.component';

export const routes: Routes = [
  { path: '', component: VerbDrillComponent },
  { path: 'settings', component: VerbSettingsComponent },
];
