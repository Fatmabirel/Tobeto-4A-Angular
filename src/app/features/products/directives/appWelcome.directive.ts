import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWelcome]',
  standalone: true,
})
export class AppWelcomeDirective {
  @Input('appWelcome') delayTime: number = 1000; // Varsayılan gecikme süresi 1000 ms (1 saniye)

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this.viewContainer.clear();
    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }, this.delayTime);
  }
 }
