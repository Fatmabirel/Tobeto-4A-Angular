import { Pipe, type PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'appTranslate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: string, lang: string): string {
    return this.translateService.instant(value, lang);
  }

}
