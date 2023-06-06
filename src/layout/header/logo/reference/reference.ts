import { DivComponent } from '../../../../web-abstract/web-component/div-component/div-component.abstract';
import { StylePosition } from '../../../../web-element/web-style.enum';
import { Logo } from '../logo';

export class Reference extends DivComponent {
  className: 'Reference';
  constructor(public parent: Logo) {
    super();
    this.className = 'Reference';
    this.propObj = {
      styleObj: {
        position: StylePosition.absolute,
        left: '-99999px',
        width: '1mm',
        height: '1mm',
      },
      attrObj: {
        id: 'reference'
      }
    };
  }
}
