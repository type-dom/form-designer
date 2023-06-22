import { TypeNode } from '../../../type-node/type-node.abstract';
import { TypeButton } from '../../../type-element/type-html/button/button.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { IButton } from './button.interface';

export class Button extends TypeButton implements IButton {
  className: 'Button';
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'Button';
  }
}
