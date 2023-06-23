import { fromEvent } from 'rxjs';
import { WebControl } from '../../../../../../../core/controls/web-control.abstract';
import { FieldProperty } from '../../field-property/field-property';
import { PropertyTextarea } from '../../property-item/textarea/property-textarea.abstract';
import { ControlProperty } from '../control-property';

// 监听控件onChange
export class ControlOnChangeProperty extends PropertyTextarea {
  className: 'ControlOnChangeProperty';

  constructor(public parent: ControlProperty | FieldProperty) {
    super('onChange', '请输入监听函数');
    this.className = 'ControlOnChangeProperty';
    this.addAttrName('control-default-value-property');
  }

  reset(value?: string): void {
    console.log('value is ', value);
    if (this.parent instanceof ControlProperty) {
      this.controlPropertyReset(value);
    }
    if (this.parent instanceof FieldProperty) {
      this.fieldPropertyReset(value);
    }
  }
  controlPropertyReset(value?: string): void {
    if (value !== undefined) { // 输入值的操作
      // this.appRoot.selectedControl?.addOnChange(this.input.dom.value);
      return;
    }
    // 选中控件
    if (this.styleObj.display === 'none') this.setStyle('display', 'block');
    // if (this.appRoot.selectedControl?.itemContent instanceof Input ||
    //   this.appRoot.selectedControl?.itemContent instanceof Textarea) {
    const changeStr = this.appRoot.selectedControl?.changeStr;
    if (changeStr) {
      this.resetInputValue(changeStr);
    } else {
      this.resetInputValue('');
    }
  }
  fieldPropertyReset(value?: string): void {
    if (value !== undefined) { // 输入值的操作
      // this.appRoot.selectedControl?.addOnChange(this.input.dom.value);
      return;
    }
    // 选中控件
    if (this.styleObj.display === 'none') this.setStyle('display', 'block');
    // if (this.appRoot.selectedControl?.itemContent instanceof Input ||
    //   this.appRoot.selectedControl?.itemContent instanceof Textarea) {
    if (this.appRoot.selectedTableDataCell?.control instanceof WebControl) {
      const changeStr = this.appRoot.selectedTableDataCell?.control?.changeStr;
      if (changeStr) {
        this.resetInputValue(changeStr);
      } else {
        this.resetInputValue('');
      }
    }
  }
  addOnChange(value: string): void {
    if (this.parent instanceof ControlProperty) {
      if (value.trim()) { // 输入值的操作
        this.appRoot.selectedControl?.addOnChange(this.content.dom.value);
        return;
      } else {
        this.appRoot.selectedControl?.removeOnChange();
      }
    }
    if (this.parent instanceof FieldProperty) {
      if (this.appRoot.selectedTableDataCell?.control instanceof WebControl) {
        if (value.trim()) { // 输入值的操作
          this.appRoot.selectedTableDataCell?.control?.addOnChange(this.content.dom.value);
          return;
        } else {
          this.appRoot.selectedTableDataCell?.control?.removeOnChange();
        }
      } else {
        console.error('this.appRoot.selectedTableDataCell?.control is not WebControl . ');
      }
    }
  }
  initEvents(): void {
    // super.initEvents();
    this.events.push(
      fromEvent(this.button.dom, 'click').subscribe(() => {
        this.addOnChange(this.content.dom.value);
      })
    );
  }
}
