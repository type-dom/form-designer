import { Subscription } from 'rxjs';
import { INodeAttr, IPath, ITypeNode } from './type-node.interface';
import { FormEditor } from '../../src/form-editor';
import { XNode } from '../x-node/x-node.class';
import { TypeElement } from '../type-element/type-element.abstract';
import { ITextNode } from '../text-node/text-node.interface';
const Entities: Record<number, string> = {
  /* < */ 0x3c: '&lt;',
  /* > */ 0x3e: '&gt;',
  /* & */ 0x26: '&amp;',
  /* " */ 0x22: '&quot;',
  /* ' */ 0x27: '&apos;',
};
function encodeToDomString(str: string) {
  const buffer = [];
  let start = 0;
  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.codePointAt(i)!;
    if (0x20 <= char && char <= 0x7e) {
      // ascii
      const entity = Entities[char];
      if (entity) {
        if (start < i) {
          buffer.push(str.substring(start, i));
        }
        buffer.push(entity);
        start = i + 1;
      }
    } else {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }
      buffer.push(`&#x${char.toString(16).toUpperCase()};`);
      if (char > 0xd7ff && (char < 0xe000 || char > 0xfffd)) {
        // char is represented by two u16
        i++;
      }
      start = i + 1;
    }
  }
  if (buffer.length === 0) {
    return str;
  }
  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }
  return buffer.join('');
}
/**
 * 虚拟DOM，TypeNode 抽象节点类, 所有节点类的基础类；
 * abstract syntax tree 抽象语法树 抽象节点类
 * 子类有:
 *    TypeElement
 *    TextNode
 *    XNode
 */
export abstract class TypeNode implements ITypeNode {
  /**
   * 在生成dom字符串时，可以转为 attributes 的一个元素 { name: 'className', value: string }
   */
  abstract className: string; // 最终实体类的名称，解析转换时需要创建对应的类；
  abstract dom: HTMLElement | SVGElement | Text;
  /**
   * 渲染出真实DOM
   */
  abstract render(): void;
  nodeName: string;
  nodeValue?: string;
  parentNode: TypeElement | XNode | null;
  childNodes?: TypeNode[];
  attributes?: INodeAttr[];
  events?: Subscription[];
  protected constructor(nodeName: string, nodeValue?: string) {
    this.nodeName = nodeName;
    if (nodeValue !== undefined) {
      this.nodeValue = nodeValue;
    }
    this.parentNode = null;
    // Object.defineProperty(this, "parentNode", { value: null, writable: true });
  }
  get editor(): FormEditor {
    // console.log('this.className is ', this.className);
    // if (this instanceof WebLayout) {
    //   return this.formEditor;
    // }
    // if (this.parent instanceof WebLayout) {
    //   return this.parent.formEditor;
    // }
    if (this.parentNode === null) {
      throw Error('this.parentNode is undefined . ');
    }
    return this.parentNode.editor;
  }
  get firstChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[0];
  }
  get nextSibling(): TypeNode | undefined {
    const childNodes = this.parentNode?.childNodes;
    if (!childNodes) {
      return undefined;
    }
    const index = childNodes.indexOf(this);
    if (index === -1) {
      return undefined;
    }
    return childNodes[index + 1];
  }
  get textContent(): string | number | boolean {
    if (!this.childNodes) {
      return this.nodeValue || '';
    }
    return this.childNodes
      .map(function (child) {
        return child.textContent;
      })
      .join('');
  }
  get children(): TypeNode[] {
    return this.childNodes || [];
  }
  hasChildNodes(): boolean {
    return this.childNodes ? this.childNodes.length > 0 : false;
  }
  /**
   * Search a node in the tree with the given path
   * foo.bar[nnn], i.e. find the nnn-th node named
   * bar under a node named foo.
   *
   * @param {Array} paths - an array of objects as
   * returned by {parseXFAPath}.
   * @param {number} pos - the current position in
   * the paths array.
   * @returns {TypeNode} The node corresponding
   * to the path or null if not found.
   */
  searchNode(paths: IPath[], pos: number): TypeNode | null {
    if (pos >= paths.length) {
      return this;
    }
    const component = paths[pos];
    const stack: [TypeNode, number][] = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node: TypeNode = this;
    while (true) {
      if (component.name === node.nodeName) {
        if (component.pos === 0) {
          const res = node.searchNode(paths, pos + 1);
          if (res !== null) {
            return res;
          }
        } else if (stack.length === 0) {
          return null;
        } else {
          const [parent] = stack.pop()!;
          let siblingPos = 0;
          for (const child of parent.childNodes!) {
            if (component.name === child.nodeName) {
              if (siblingPos === component.pos) {
                return child.searchNode(paths, pos + 1);
              }
              siblingPos++;
            }
          }
          // We didn't find the correct sibling
          // so just return the first found node
          return node.searchNode(paths, pos + 1);
        }
      }
      if (node.childNodes && node.childNodes.length !== 0) {
        stack.push([node, 0]);
        node = node.childNodes[0];
      } else if (stack.length === 0) {
        return null;
      } else {
        while (stack.length !== 0) {
          const [parent, currentPos] = stack.pop()!;
          const newPos = currentPos + 1;
          if (newPos < parent.childNodes!.length) {
            stack.push([parent, newPos]);
            node = parent.childNodes![newPos];
            break;
          }
        }
        if (stack.length === 0) {
          return null;
        }
      }
    }
  }
  dump(buffer: string[]): void {
    if (this.nodeName === '#text') {
      buffer.push(encodeToDomString(this.nodeValue?.toString() || ''));
      return;
    }
    buffer.push(`<${this.nodeName}`);
    if (this.attributes) {
      for (const attribute of this.attributes) {
        buffer.push(
          ` ${attribute.name}="${encodeToDomString(attribute.value.toString())}"`
        );
      }
    }
    if (this.hasChildNodes()) {
      buffer.push('>');
      if (this.childNodes) {
        for (const child of this.childNodes) {
          child.dump(buffer);
        }
      }
      buffer.push(`</${this.nodeName}>`);
    } else if (this.nodeValue) {
      buffer.push(`>${encodeToDomString(this.nodeValue.toString())}</${this.nodeName}>`);
    } else {
      buffer.push('/>');
    }
  }
  /**
   * 保存json数据时使用。
   * 把当前数据层对象转换为 JSON 字面量。
   * 但是就数据层存储而言，是不需要转化page及其子元素的。
   * todo events如何处理？？
   */
  toJSON(): ITypeNode {
    return {
      nodeName: this.nodeName,
      className: this.className,
      attributes: this.attributes,
      childNodes: this.children.map(child => {
        if (child.nodeName === '#text') {
          return {
            className: 'TextNode',
            nodeName: '#text',
            nodeValue: child.nodeValue, // textContent
          } as ITextNode;
        } else {
          return child.toJSON();
        }
      })
    } as ITypeNode;
  }
}
