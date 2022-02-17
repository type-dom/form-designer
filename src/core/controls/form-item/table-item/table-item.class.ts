import { fromEvent } from 'rxjs';
import { Label } from '../../../../web-element/label/label.class';
import { WebTable } from '../../../../web-element/table/table.class';
import { WebTableRow } from '../../../../web-element/table/row/row.class';
import { Span } from '../../../../web-element/span/span.class';
import { Display } from '../../../../web-element/web-style.enum';
import { toJSON } from '../../../../web-element/web-element.function';
import { IWebTableRow } from '../../../../web-element/table/row/row.interface';
import { AddSvg } from '../../../../components/svgs/add/add';
import { TableControl } from '../../complex/table/table.class';
import { FormItem } from '../form-item.abstract';
import { ITableItem } from './table-item.interface';

export class TableItem extends FormItem implements ITableItem {
  className: 'TableItem';
  childNodes: [Label, WebTable, Span];
  itemContent: WebTable;
  addSpan: Span;

  constructor(public parent: TableControl, labelText = '表格') {
    super(labelText);
    this.label.propObj.styleObj = {
      display: 'block',
      width: '100%',
      lineHeight: '36px',
      color: '#606266',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '20px',
      padding: '10px',
    };
    this.className = 'TableItem';
    this.itemContent = new WebTable(this);
    this.addSpan = new Span(this);
    this.addSpan.setStyleObj({
      display: Display.block,
      textAlign: 'center',
      marginTop: '-10px',
    });
    const addSvg = new AddSvg(this.addSpan);
    this.addSpan.addChild(addSvg);
    this.childNodes = [this.label, this.itemContent, this.deleteSpan];
    this.initEvents();
  }

  initEvents(): void {
    this.events.push(
      fromEvent(this.addSpan.dom, 'click').subscribe(() => {
        // console.log('table item this.addSpan click ');
        const tr: Record<string, string> = {};
        if (!this.itemContent.config) {
          throw Error('没有设置表头');
        }
        for (let head of this.itemContent.config?.tableHeader) {
          tr[head.name] = ' ';
        }
        this.itemContent.config?.tableData.push(tr);
        const tableRow = new WebTableRow(this.itemContent, tr);
        // console.log('toJSON(this.itemContent.childNodes[1] is ', toJSON(this.itemContent.childNodes[1]));
        tableRow.createInstance(toJSON(this.itemContent.childNodes[1]) as IWebTableRow);
        this.itemContent.appendChild(tableRow);
      })
    );
  }

  createInstance(itemLiteral: ITableItem): void {
    super.createInstance(itemLiteral);
    // 单独对table的值进行修改
    // console.log('this.itemContent is WebTable ', this.itemContent);
    // console.log('itemContentLiteral', itemLiteral.childNodes[1]);
    this.itemContent.createInstance(itemLiteral.childNodes[1]);
  }
}
