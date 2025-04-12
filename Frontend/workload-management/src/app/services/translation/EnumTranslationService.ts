import {Injectable} from '@angular/core';

export enum Degree {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTORATE = 'DOCTORATE',
  PROFESSIONAL_QUALIFICATION = 'PROFESSIONAL_QUALIFICATION'
}

export enum BudgetPosition {
  ZB = 'ZB',
  PF = 'PF',
  M = 'M',
  grant = 'grant'
}

@Injectable({
  providedIn: 'root'
})

export class EnumTranslationService {
  readonly enumTypes = {
    degree: Degree,
    budgetPositions: BudgetPosition
  };
  private translations: { [key: string]: { [key: string]: string } } = {
    degree: {
      [Degree.BACHELOR]: 'Bakalaurs',
      [Degree.MASTER]: 'Maģistrs',
      [Degree.DOCTORATE]: 'Doktors',
      [Degree.PROFESSIONAL_QUALIFICATION]: '4. profesionālais kvalifikācijas līmenis'
    },
    budgetPosition: {
      [BudgetPosition.ZB]: 'zinātnes bāze',
      [BudgetPosition.PF]: 'pašvaldības finansējums',
      [BudgetPosition.M]: 'maksas pakalpojumi',
      [BudgetPosition.grant]: 'valsts finansējums'
    }
  };

  translate(type: string, value: string): string {
    if (!this.translations[type] || !this.translations[type][value]) {
      return value;
    }
    return this.translations[type][value];
  }
}
