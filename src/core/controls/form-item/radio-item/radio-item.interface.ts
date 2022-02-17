import { ILabel } from '../../../../web-element/label/label.interface';
import { ISpan } from '../../../../web-element/span/span.interface';
import { IRadioGroup } from '../../../../components/radio-group/radio-group.interface';
import { IFormItem } from '../form-item.interface';

export interface IRadioItem extends IFormItem {
  className: 'RadioItem',
  childNodes: [ILabel, IRadioGroup, ISpan]
}
