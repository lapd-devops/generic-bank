import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[exposeHeight]'
})
export class ExposeHeightDirective implements AfterViewChecked {
  private lastHeight = 0;

  @HostListener('window:resize', ['$event'])
  private onResize() {
    let totalHeight = 0;
    let $parent;

    if($parent = this.elem.nativeElement.children[1]) {
      for(let child of $parent.children) {
        // console.log(child.clientHeight, child);
        totalHeight += child.clientHeight;
      }
      // console.log('TOTAL: ', totalHeight);

      if(this.lastHeight !== totalHeight) {
        this.lastHeight = totalHeight;
        this.elemHeight.emit(totalHeight);
      }
    }
  };

  @Output('exposeHeight')
  public elemHeight = new EventEmitter();

  constructor(private elem: ElementRef) {

  }

  ngAfterViewChecked() {
    this.onResize();
  }
}