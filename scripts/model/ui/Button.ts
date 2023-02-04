import DefaultModel from '../DefaultModel'
import { type IAddButtonOptions } from '../../interface/IAddButtonOptions'

/**
 * Class Button
 */
export default class Button extends DefaultModel {
  public text: string
  public x: number
  public y: number
  public width: number
  public height: number

  public onClick?: () => void
  public mouseEnter?: () => void
  public mouseLeave?: () => void

  public isOver: boolean = false

  /**
   * @constructor
   * @param {IAddButtonOptions} options
   * @public
   */
  public constructor(options: IAddButtonOptions) {
    super()
    this.text = options.text
    this.x = options.x
    this.y = options.y
    this.width = options.width ?? 200
    this.height = options.height ?? 50

    this.show()
    this.canvas.addEventListener('click', this._onClick.bind(this))
    this.canvas.addEventListener('mousemove', this.mouseOver.bind(this))
  }

  /**
   * @return {void}
   * @public
   */
  public show(): void {
    this.context.fillStyle = 'blue'
    this.context.fillRect(this.x, this.y, this.width, this.height)

    this.context.font = '24px sans-serif'
    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'
    this.context.fillStyle = 'white'
    // const testSize = this.context.measureText(this.text)
    this.context.fillText(this.text, this.x, this.y)
  }

  /**
   * @return {void}
   * @param {MouseEvent} event
   * @private
   */
  private _onClick(event: MouseEvent): void {
    this.calcPosButton(event, () => {
      if (this.onClick != null) this.onClick()
    })
  }

  /**
   * @return {void}
   * @param {MouseEvent} event
   * @private
   */
  private _mouseEnter(event: MouseEvent): void {
    if (this.mouseEnter != null) this.mouseEnter()
  }

  /**
   * @return {void}
   * @param {MouseEvent} event
   * @private
   */
  private _mouseLeave(event: MouseEvent): void {
    if (this.mouseLeave != null) this.mouseLeave()
  }

  /**
   * @return {void}
   * @param {MouseEvent} event
   * @private
   */
  private mouseOver(event: MouseEvent): void {
    this.calcPosButton(
      event,
      () => {
        if (!this.isOver) {
          this._mouseEnter(event)
        }
        this.isOver = true
      },
      () => {
        if (this.isOver) {
          this._mouseLeave(event)
          this.isOver = false
        }
      }
    )
  }

  /**
   * @return {void}
   * @param {MouseEvent} event
   * @param {Function} callback
   * @param {Function} callbackOut
   * @private
   */
  private calcPosButton(
    event: MouseEvent,
    callback?: () => void,
    callbackOut?: () => void
  ): void {
    // // Get the mouse position relative to the canvas element
    const clickX = event.clientX - this.canvas.offsetLeft
    const clickY = event.clientY - this.canvas.offsetTop
    // // Check if the mouse position is inside the button
    if (
      clickX > this.x &&
      clickX < this.x + this.width &&
      clickY > this.y &&
      clickY < this.y + this.height
    ) {
      if (callback != null) callback()
    } else if (callbackOut != null) callbackOut()
  }
}
