import { SvgComponent } from '../../../web-abstract/web-component/svg-component/svg-component.abstract';
import { HtmlElement } from '../../../web-element/html-element/html-element.abstract';
import { SvgPath } from '../../../web-element/svg-element/path/path.class';

export class SelectSvg extends SvgComponent {
  className: 'SelectSvg';
  childNodes: [SvgPath];
  constructor(public parent: HtmlElement) {
    super();
    this.className = 'SelectSvg';
    this.addAttrObj({
      viewBox: '0 0 2048 1024',
    });
    this.resetSize(30, 24);
    const path = new SvgPath(this);
    path.setData('M568.001387 1.042815V0c-21.987866 0.377188-43.931357 2.218755-65.830473 0.931877a11.093777 11.093777 0 0 1-5.169701 1.242503c-15.176287 0-30.330387 0.931877-45.484486 0a11.692841 11.692841 0 0 1-4.43751-1.109377H0v1022.846247h454.84486a12.757844 12.757844 0 0 1 1.486567 0c19.680361 0 39.338534-1.530941 59.018894-0.643439 2.019067 0 4.060322 0.221876 6.07939 0.332813 4.437511-0.199688 9.07471-0.399376 13.60097-0.710002 12.646906-0.865315 24.916623-1.885942 36.942278 1.020628H1817.160686V1.065003z m1136.002773 909.689721H568.001387v-0.732189h-111.66996a12.780031 12.780031 0 0 1-1.486567 0v0.820939H113.156526v-794.314439h336.74051a11.093777 11.093777 0 0 1 4.947824-1.109378c38.850407-0.155313 77.545502-3.749697 116.218409 1.109378H1704.00416zM1653.372162 422.717282l-219.634599 219.568036-219.634599-219.568036h439.269198z');
    this.childNodes = [path];
  }
}
