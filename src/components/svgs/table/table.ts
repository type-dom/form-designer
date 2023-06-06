import { SvgComponent } from '../../../web-abstract/web-component/svg-component/svg-component.abstract';
import { HtmlElement } from '../../../web-element/html-element/html-element.abstract';
import { SvgPath } from '../../../web-element/svg-element/path/path.class';

export class TableSvg extends SvgComponent {
  className: 'TableSvg';
  childNodes: [SvgPath];
  constructor(public parent: HtmlElement) {
    super();
    this.className = 'TableSvg';
    const path = new SvgPath(this);
    path.setData('M329.142857 786.285714l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM329.142857 566.857143l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM621.714286 786.285714l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM329.142857 347.428571l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM621.714286 566.857143l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM914.285714 786.285714l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM621.714286 347.428571l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM914.285714 566.857143l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM914.285714 347.428571l0-109.714286q0-7.972571-5.12-13.165714t-13.165714-5.12l-182.857143 0q-7.972571 0-13.165714 5.12t-5.12 13.165714l0 109.714286q0 7.972571 5.12 13.165714t13.165714 5.12l182.857143 0q7.972571 0 13.165714-5.12t5.12-13.165714zM987.428571 164.571429l0 621.714286q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-768 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-621.714286q0-37.741714 26.843429-64.585143t64.585143-26.843429l768 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z');
    this.childNodes = [path];
  }
}
