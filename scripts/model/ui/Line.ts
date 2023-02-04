import DefaultModel from '../DefaultModel'

/**
 * Class Line
 */
export class Line extends DefaultModel {
  /**
   * @constructor
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @public
   */
  public constructor(x: number, y: number, w: number, h: number) {
    super()
    this.context.beginPath()
    this.context.fillStyle = this.LINE_COLOR
    this.context.fillRect(x, y, w, h)
  }
}
