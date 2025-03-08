import { Injectable } from '@angular/core';
export enum Degree {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTORATE = 'DOCTORATE'
}
@Injectable({
  providedIn: 'root'
})

export class EnumTranslationService {
  readonly enumTypes = {
    degree: Degree
  };
  private translations: { [key: string]: { [key: string]: string } } = {
    degree: {
      [Degree.BACHELOR]: 'Bakalaurs',
      [Degree.MASTER]: 'Maģistrs',
      [Degree.DOCTORATE]: 'Doktors'
    }
  };
  translate(type: string, value: string): string {
    if (!this.translations[type] || !this.translations[type][value]) {
      return value;
    }
    return this.translations[type][value];
  }
}
