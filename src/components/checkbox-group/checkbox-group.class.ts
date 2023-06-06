import { DivComponent } from '../../web-abstract/web-component/div-component/div-component.abstract';
import { HtmlElement } from '../../web-element/html-element/html-element.abstract';
import { IOption } from '../../core/controls/web-control.interface';
import { CheckboxOption } from './checkbox-option/checkbox-option.class';
import { ICheckboxGroup } from './checkbox-group.interface';

export class CheckboxGroup extends DivComponent implements ICheckboxGroup {
  className: 'CheckboxGroup';
  childNodes: CheckboxOption[];
  value: (string | number | boolean)[]; // 应该是个数组
  constructor(public parent: HtmlElement) {
    super();
    this.className = 'CheckboxGroup';
    this.addAttrName('checkbox-group');
    this.childNodes = [];
    this.value = [];
  }
  setOptions(options: IOption[]): void {
    this.clearChildNodes();
    this.clearChildDom();
    this.value = [];
    const random = Math.random();
    options.forEach((opt) => {
      const optObj = new CheckboxOption(this);
      optObj.input.addAttrObj({
        name: 'checkbox' + random,
        label: opt.label,
        value: opt.value,
        checked: opt.checked || false
      });
      if (opt.checked) {
        this.value.push(opt.value);
      }
      optObj.text.setText(opt.label);
      this.addChild(optObj);
    });
  }
  setValue(value: string | number | boolean): void {
    // console.error('checkbox group setValue ');
    value = String(value);
    if (value.trim()) {
      // console.error('value is ', value);
      this.value = value.split(',');
      this.childNodes.forEach(optObj => {
        if (this.value.indexOf(String(optObj.input.attrObj.value)) !== -1) {
          optObj.input.setAttrObj({
            checked: true,
          });
        } else {
          optObj.input.removeAttribute('checked');
        }
      });
    } else {
      // console.error('value is ', value);
      this.childNodes.forEach(optObj => {
        optObj.input.removeAttribute('checked');
      });
    }
  }
}
