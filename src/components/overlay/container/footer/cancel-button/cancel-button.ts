import { fromEvent } from 'rxjs';
import { WebTextNode } from '../../../../../web-text-node/web-text-node.class';
import { ButtonComponent } from '../../../../../web-abstract/web-component/button-component/button-component.abstract';
import { OverlayFooter } from '../footer';

export class CancelButton extends ButtonComponent {
  className: 'CancelButton';
  childNodes: [WebTextNode];

  constructor(public parent: OverlayFooter) {
    super();
    this.className = 'CancelButton';
    this.propObj = {
      styleObj: {
        // backgroundColor: '#f00',
        // color: '#FFF',
        margin: 'auto 10px',
        // outline: 'none',
        // border: '1px solid #f00',
      },
      attrObj: {
        name: 'cancel-button',
      }
    };

    // this.svg = new CloseSvg(this);
    this.childNodes = [this.textNode];

    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.parent.parent.parent.hide();
      }),
    );
  }
}
