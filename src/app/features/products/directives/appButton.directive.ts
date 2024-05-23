import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class AppButtonDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // Button elementine stil eklemek için constructor içinde gerekli işlemleri gerçekleştiriyoruz.
    this.renderer.addClass(this.elementRef.nativeElement, 'app-button-style');
  }

  // Fare üzerine gelindiğinde butonun stiline bir değişiklik yapabiliriz.
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      '#4CAF50'
    );
  }

  // Fare butonun üzerinden çekildiğinde stil değişikliğini geri alabiliriz.
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      ''
    );
  }
}
