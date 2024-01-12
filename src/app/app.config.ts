import {ApplicationConfig} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideThemeSelector} from '@grzeg95/angular-lib-theme-selector';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideThemeSelector({
      themes: {
        names: ['pink'],
        default: 'pink'
      }
    })
  ]
};
