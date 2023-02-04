/**
 * Class DefaultModel
 */
export default class DefaultModel {
  public context: CanvasRenderingContext2D
  public canvas: HTMLCanvasElement

  public readonly LINE_COLOR = '#ffffff'
  public readonly BACKGROUND_COLOR = '#2c3e50'

  public BORDER_WIDTH = 3
  public BORDER_OFFSET = this.BORDER_WIDTH * 2

  /**
   * @constructor
   * @public
   */
  public constructor() {
    this.canvas = this.getCanvas()
    this.context = this.getContext()
  }

  /**
   * @return {HTMLCanvasElement}
   * @public
   */
  public getCanvas(): HTMLCanvasElement {
    const canvas = document.querySelector('canvas')
    if (canvas === null) throw new Error('Failed to get canvas')
    return canvas
  }

  /**
   * @return {CanvasRenderingContext2D}
   * @public
   */
  public getContext(): CanvasRenderingContext2D {
    const ctx = this.getCanvas().getContext('2d')
    if (ctx === null) throw new Error('Failed to get context')
    return ctx
  }
}
