import { HtmlElement } from '../../../web-element/html-element/html-element.abstract';
import { SvgPath } from '../../../web-element/svg-element/path/path.class';
import { SvgComponent } from '../../../web-abstract/web-component/svg-component/svg-component.abstract';

export class AddSvg extends SvgComponent {
  className: 'AddSvg';
  childNodes: [SvgPath];
  constructor(public parent: HtmlElement) {
    super();
    this.className = 'AddSvg';
    this.resetSize(24, 24);
    const path = new SvgPath(this);
    path.setData('M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m34.133333 213.333333c4.693333 0 8.533333 3.84 8.533334 8.533333V469.333333h140.8c4.693333 0 8.533333 3.84 8.533333 8.533334v46.933333a8.533333 8.533333 0 0 1-8.533333 8.533333H554.666667v140.8a8.533333 8.533333 0 0 1-8.533334 8.533334h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533334V533.333333h-140.8a8.533333 8.533333 0 0 1-8.533334-8.533333v-46.933333c0-4.693333 3.84-8.533333 8.533334-8.533334H490.666667v-140.8c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933333z');
    this.childNodes = [path];
  }
}
