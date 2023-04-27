import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClickToCopy]'
})
export class ClickToCopyDirective {

  target: HTMLElement;
  constructor(private ele: ElementRef) {
    this.target = this.ele.nativeElement;
    this.target.classList.add('position-relative');
    const tempEle = document.createElement('span');
    tempEle.classList.add('position-absolute');
    tempEle.classList.add('text-secondary');
    tempEle.classList.add('hover');
    tempEle.textContent = 'Copy';
    tempEle.style.top = '5px';
    tempEle.style.right = '5px';
    tempEle.addEventListener('click', this.copyContent);
    this.target.appendChild(tempEle);
  }

  copyContent(event: MouseEvent) {
    let target = (event.target as HTMLElement);
    target.textContent = 'Copied!!';
    setTimeout(() => {
      target.textContent = 'Copy';
    }, 2000);
    let content = target.parentElement?.textContent as string;
    content = content.replaceAll('Copied!!', '');
    navigator.clipboard.writeText(content);
  }
}
