import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppNoCharacterInput]',
  standalone: true,
})
export class AppNoCharacterInputDirective {
  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    input.value = inputValue.replace(/[^a-zA-Z]/g, ''); // Sadece harf karakterlerine izin ver
  }
}
