import { Injectable } from '@angular/core';
import { VerbSettings, DEFAULT_SETTINGS, SETTINGS_KEY } from '../Models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  load(): VerbSettings {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };
      const parsed = JSON.parse(raw) as Partial<VerbSettings>;
      return { ...DEFAULT_SETTINGS, ...parsed } as VerbSettings;
    } catch (e) {
      console.warn('Failed to load settings, using defaults', e);
      return { ...DEFAULT_SETTINGS };
    }
  }

  save(settings: VerbSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }

  reset(): void {
    try {
      localStorage.removeItem(SETTINGS_KEY);
    } catch (e) {
      console.warn('Failed to reset settings', e);
    }
  }
}
