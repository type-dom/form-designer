import { SvgElement } from '../svg-element.abstract';
import { WebTextNode } from '../../web-text-node/web-text-node.class';
import { WebSvg } from '../svg/svg.class';
import { ISvgText, ISvgTextProperty } from './text.interface';

export class SvgText extends SvgElement implements ISvgText {
  tagName: 'text';
  dom: SVGTextElement;
  className: 'SvgText';
  propObj: ISvgTextProperty;
  childNodes: WebTextNode[];
  constructor(public parent: WebSvg) {
    super();
    this.tagName = 'text';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.tagName);
    this.className = 'SvgText';
    this.propObj = {
      styleObj: {},
      attrObj: {
        x: 0,
        y: 0,
      }
    };
    this.childNodes = [new WebTextNode(this, '')];
  }
}
