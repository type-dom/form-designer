import { IOptionConfig } from '../../../../../../../core/controls/web-control.interface';
import { PropertyRadio } from '../../property-item/radio/property-radio.abstract';
import { ControlProperty } from '../control-property';
import { FieldProperty } from '../../field-property/field-property';
import { TextNode } from '../../../../../../../../type-dom/text-node/text-node.class';

const readonlyConfigs: IOptionConfig = {
  name: '只读' + Math.random(),
  resultValue: 'disable',
  options: [
    {
      label: '是',
      value: 'disabled',
      checked: false,
    },
    {
      label: '否',
      value: '',
      checked: true,
    },
  ]
};
// 标题对齐属性
export class ReadonlyProperty extends PropertyRadio {
  className: 'ReadonlyProperty';
  constructor(public parent: ControlProperty | FieldProperty) {
    super('只读', readonlyConfigs);
    // console.log('control title property constructor . ');
    this.className = 'ReadonlyProperty';
    this.addAttrName('require-property');
    // console.log('this.dom is ', this.dom);
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
    if (value !== undefined) {
      if (value === 'disabled') {
        this.appRoot.selectedControl?.setDisabled();
      } else {
        this.appRoot.selectedControl?.removeDisabled();
      }
      return;
    }
    // when select control
    console.log('this.styleObj.display is ', this.styleObj.display);
    // if (this.appRoot.selectedTableDataCell?.control instanceof )
    if (this.styleObj.display === 'none') this.show();
    let disabled = this.appRoot.selectedControl?.formItem.itemContent.attrObj.disabled as boolean;
    console.log('disabled is ', disabled);
    this.resetResultValue(disabled ? 'disabled' : '');
  }
  fieldPropertyReset(value?: string): void {
    if (!this.appRoot.selectedTableDataCell) {
      console.error('this.appRoot.selectedTableDataCell is null . ');
      return;
    }
    if (this.appRoot.selectedTableDataCell?.control instanceof TextNode) {
      console.error('this.appRoot.selectedTableDataCell?.control is not WebControl . ');
      return;
    }
    if (value !== undefined) {
      if (value === 'disabled') {
        this.appRoot.selectedTableDataCell?.control.setDisabled();
      } else {
        this.appRoot.selectedTableDataCell?.control.removeDisabled();
      }
      return;
    }
    console.log('this.styleObj.display is ', this.styleObj.display);
    // if (this.appRoot.selectedTableDataCell?.control instanceof )
    if (this.styleObj.display === 'none') this.show();
    // todo 字段属性栏中设置。
    let disabled = this.appRoot.selectedTableDataCell.control.formItem.itemContent.attrObj.disabled as boolean;
    console.log('disabled is ', disabled);
    this.resetResultValue(disabled ? 'disabled' : '');
  }
}
