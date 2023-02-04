import DefaultModel from '../DefaultModel'

/**
 * Class Box
 */
export default class Box extends DefaultModel {
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
    this.context.fillRect(
      x + this.BORDER_OFFSET / 2 - this.BORDER_WIDTH,
      y + this.BORDER_OFFSET / 2 - this.BORDER_WIDTH,
      w,
      h
    )
    this.context.fillStyle = this.BACKGROUND_COLOR
    this.context.fillRect(
      x + this.BORDER_WIDTH,
      y + this.BORDER_WIDTH,
      w - this.BORDER_OFFSET,
      h - this.BORDER_OFFSET
    )
  }
}
