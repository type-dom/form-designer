import { SvgElement } from '../svg-element.abstract';
import { WebSvg } from '../svg/svg.class';
import { ISvgEllipse, ISvgEllipseProperty } from './ellipse.interface';

export class SvgEllipse extends SvgElement implements ISvgEllipse {
  tagName: 'ellipse';
  className: 'SvgEllipse';
  dom: SVGEllipseElement;
  propObj: ISvgEllipseProperty;
  childNodes: [];
  cx = 0;
  cy = 0;
  rx = 0;
  ry = 0;

  constructor(public parent: WebSvg) {
    super();
    this.tagName = 'ellipse';
    this.className = 'SvgEllipse';
    this.dom = document.createElementNS('http://www.w3.org/2000/svg', this.tagName);
    this.childNodes = [];
    this.propObj = {
      styleObj: {
        fill: 'rgb(255, 255, 255)',
        stroke: '#000',
        strokeWidth: 1,
      },
      attrObj: {
        cx: this.cx,
        cy: this.cy,
        rx: this.rx,
        ry: this.ry
      }
    };
  }

  reset(cx: string | number, cy: string | number, rx: string | number, ry: string | number): SvgEllipse {
    this.setAttrObj({
      cx,
      cy,
      rx,
      ry
    });
    return this;
  }
}
