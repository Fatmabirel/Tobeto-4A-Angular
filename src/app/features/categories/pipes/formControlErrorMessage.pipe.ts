import { Pipe, type PipeTransform } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'appFormControlErrorMessage',
  standalone: true,
})
export class FormControlErrorMessagePipe implements PipeTransform {
  
  transform(control: AbstractControl | null): string {
    if (!control || !control.errors) {
      return '';
    }
    const errors: ValidationErrors = control.errors;
    if (errors['required']) {
      return 'Bu alanı doldurmak gereklidir.';
    }
    return '';
  }

}
