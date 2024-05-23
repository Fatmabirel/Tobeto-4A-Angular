import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appMultiple]',
  standalone : true
})
export class AppMultipleDirective implements OnInit {
  @Input('appMultiple') count!: number;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit() {
    this.viewContainerRef.clear();
    for (let i = 0; i < this.count; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: i + 1,
        index: i,
      });
    }
  }
}
