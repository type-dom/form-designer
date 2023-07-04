/**
 * TypeRoot是一个元素根节点抽象类
 * 作为前端项目的入口文件要继承根节点抽象类，并挂载到对应的 ID 上。
 */
import { TypeDiv } from '../type-element/type-html/div/div.abstract';
import { ITypeRoot } from './type-root.interface';
/**
 * el 元素对象或dom的ID；
 * parent 只有自己
 */
export abstract class TypeRoot extends TypeDiv implements ITypeRoot {
  parent: TypeRoot;
  protected constructor(el: HTMLElement | string) {
    super();
    this.parent = this;
    if (el instanceof HTMLElement) {
      el.appendChild(this.dom);
    } else {
      const app = document.querySelector<Element>(el);
      if (app) {
        app.appendChild(this.dom);
      } else {
        throw Error('Can not find dom id . ');
      }
    }
  }
}
