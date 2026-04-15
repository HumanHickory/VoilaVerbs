import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SettingsService } from '../../Services/settings.service';
import {
  VerbSettings,
  DEFAULT_SETTINGS,
  IrregularFilter,
  ReflexiveFilter,
} from '../../Models/settings.model';
import { TENSE_LABELS, type Tense } from '../../Enums/tense.enum';
import type { Pronoun } from '../../Enums/pronoun.enum';

@Component({
  selector: 'verb-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verb-settings.component.html',
  styleUrls: ['./verb-settings.component.scss'],
})
export class VerbSettingsComponent {
  // choices (hard-coded lists matching project enums)
  readonly allTenses: Tense[] = ['present', 'imparfait', 'future', 'passeCompose', 'subjonctif'];
  readonly allSubjects: Pronoun[] = ['je', 'tu', 'elle', 'nous', 'vous', 'elles'];
  readonly allGroups = ['er', 'ir', 're', 'irregular'];
  readonly allAux = ['avoir', 'etre'];
  readonly irregularOptions = ['all', 'regular', 'irregular'];
  readonly reflexiveOptions = ['all', 'reflexiveOnly', 'excludeReflexive'];
  readonly negativeOptions = ['all', 'positiveOnly', 'negativeOnly'];

  settings: VerbSettings;
  errorMessage = '';

  constructor(
    private svc: SettingsService,
    private router: Router,
  ) {
    this.settings = this.svc.load();
  }

  // toggle helpers for checkbox arrays
  toggleArray<T>(arr: T[], v: T) {
    const i = arr.indexOf(v as any);
    if (i === -1) arr.push(v);
    else arr.splice(i, 1);
  }

  isIn<T>(arr: T[], v: T) {
    return arr.indexOf(v as any) !== -1;
  }

  save() {
    this.errorMessage = '';
    const missing = this.validateFilters();
    if (missing.length > 0) {
      this.errorMessage = `Invalid filters: please select at least one ${missing.join(', ')}.`;
      return;
    }

    this.svc.save(this.settings);
    // navigate back to root so modal/overlay is dismissed if opened via route
    this.router.navigateByUrl('/');
  }

  private validateFilters(): string[] {
    const missing: string[] = [];
    if (!this.settings.tenses || this.settings.tenses.length === 0) missing.push('tense');
    if (!this.settings.subjects || this.settings.subjects.length === 0) missing.push('subject');
    if (!this.settings.groups || this.settings.groups.length === 0) missing.push('verb group');
    if (!this.settings.auxiliaries || this.settings.auxiliaries.length === 0)
      missing.push('auxiliary selection');
    return missing;
  }

  reset() {
    this.svc.reset();
    this.settings = { ...DEFAULT_SETTINGS };
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  // typed setters to avoid template assignment type errors
  setIrregularFilter(opt: string) {
    this.settings.irregularFilter = opt as IrregularFilter;
  }

  setReflexiveFilter(opt: string) {
    this.settings.reflexiveFilter = opt as ReflexiveFilter;
  }

  setNegativeFilter(opt: string) {
    this.settings.negatives = opt as any;
  }

  getDisplayTense(tense: Tense): string {
    return TENSE_LABELS[tense] ?? tense;
  }
}
