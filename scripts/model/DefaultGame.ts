import DefaultModel from './DefaultModel'
import Button from './ui/Button'
import { type IAddButtonOptions } from '../interface/IAddButtonOptions'
import Box from './ui/Box'
import { Line } from './ui/Line'

/**
 * Class DefaultGame
 */
export default class DefaultGame extends DefaultModel {
  private _running: boolean = false
  private _endGame: boolean = false

  /**
   * @constructor
   * @public
   */
  public constructor() {
    super()

    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.canvas.style.width = String(this.canvas.width)
    this.canvas.style.height = String(this.canvas.height)
  }

  /**
   * @return {boolean}
   */
  get running(): boolean {
    return this._running
  }

  /**
   * @param {boolean} value
   */
  set running(value: boolean) {
    this._running = value
  }

  /**
   * @return {boolean}
   */
  get endGame(): boolean {
    return this._endGame
  }

  /**
   * @param {boolean} value
   */
  set endGame(value: boolean) {
    this._endGame = value
  }

  /**
   * @return {void}
   */
  public drawTerrain(): void {
    // The base of the field
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawBlock(0, 0, this.canvas.width, this.canvas.height)

    // Left side
    this.drawBlock(0, 0, 100, this.canvas.height)

    // Right side
    this.drawBlock(this.canvas.width - 100, 0, 100, this.canvas.height)

    // Top side
    this.drawBlock(0, 0, this.canvas.width, 50)

    // Bottom side
    this.drawBlock(0, this.canvas.height - 50, this.canvas.width, 50)

    // Middle line
    this.drawLine(
      this.canvas.width / 2 - this.BORDER_WIDTH / 2,
      0,
      this.BORDER_WIDTH,
      this.canvas.height
    )

    this.drawLine(
      this.canvas.width / 1.5 - this.BORDER_WIDTH,
      0,
      this.BORDER_WIDTH,
      this.canvas.height
    )

    this.drawLine(
      this.canvas.width / 3 - this.BORDER_WIDTH,
      0,
      this.BORDER_WIDTH,
      this.canvas.height
    )

    this.drawLine(
      this.canvas.width / 1.5 - this.BORDER_WIDTH,
      this.canvas.height / 2 - this.BORDER_WIDTH,
      this.canvas.width / 3,
      this.BORDER_WIDTH
    )

    this.drawLine(
      0,
      this.canvas.height / 2 - this.BORDER_WIDTH,
      this.canvas.width / 3 - this.BORDER_WIDTH,
      this.BORDER_WIDTH
    )

    //
    this.drawLine(
      100 - this.BORDER_WIDTH,
      0,
      this.BORDER_WIDTH,
      this.canvas.height
    )

    this.drawLine(
      this.canvas.width - 100,
      0,
      this.BORDER_WIDTH,
      this.canvas.height
    )
  }

  /**
   * @return {Button}
   * @param {IAddButtonOptions} options
   */
  public addButton(options: IAddButtonOptions): Button {
    return new Button(options)
  }

  /**
   * @return {Box}
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @public
   */
  public drawBlock(x: number, y: number, w: number, h: number): Box {
    return new Box(x, y, w, h)
  }

  /**
   * @return {Line}
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @public
   */
  public drawLine(x: number, y: number, w: number, h: number): Line {
    return new Line(x, y, w, h)
  }
}
