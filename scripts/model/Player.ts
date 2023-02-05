import DefaultModel from './DefaultModel'
import { EDirection } from '../enum/EDirection'
import { EPlayerSide, type IPlayer } from '../interface/IPlayer'

/**
 * Class Player
 */
export class Player extends DefaultModel {
  get side(): EPlayerSide {
    return this._side
  }

  set side(value: EPlayerSide) {
    this._side = value
  }

  public static WIDTH = 15
  public static HEIGHT = 125

  public static DIRECTION_UP = ['ArrowUp', 'KeyZ', 'KeyW', 'Numpad8']
  public static DIRECTION_DOWN = ['ArrowDown', 'KeyS', 'Numpad2']

  private _x: number
  private _y: number
  private _move: EDirection
  private _speed: number
  private _freeze: boolean = true
  private _side: EPlayerSide = EPlayerSide.LEFT

  /**
   * @constructor
   * @param {IPlayer} options
   * @public
   */
  public constructor(options: IPlayer) {
    super()
    this._move = options.move ?? EDirection.IDLE
    this._speed = options.speed ?? 7

    this.listenMove()
    setInterval(() => {
      this.refreshRate()
    })
  }

  /**
   * @return {void}
   * @private
   */
  private refreshRate(): void {
    if (!this.freeze) {
      this.movePlayer()
      this.checkPlayerCollidesWithTheBoundLimits()
    }
  }

  /**
   * @return {void}
   * @private
   */
  private movePlayer(): void {
    if (this.move === EDirection.UP) this.y -= this.speed
    else if (this.move === EDirection.DOWN) this.y += this.speed
  }

  /**
   * @return {void}
   * @private
   */
  private checkPlayerCollidesWithTheBoundLimits(): void {
    if (this.y <= 0) this.y = 0
    else if (this.y >= this.canvas.height - Player.HEIGHT)
      this.y = this.canvas.height - Player.HEIGHT
  }

  /**
   * @return {void}
   * @private
   */
  private listenMove(): void {
    document.addEventListener('keydown', key => {
      if (Player.DIRECTION_UP.includes(key.code)) {
        this.move = EDirection.UP
      }

      if (Player.DIRECTION_DOWN.includes(key.code)) {
        this.move = EDirection.DOWN
      }
    })

    document.addEventListener('keyup', key => {
      if (this.move !== EDirection.IDLE) this.move = EDirection.IDLE
    })
  }

  /**
   * @return {boolean}
   */
  get freeze(): boolean {
    return this._freeze
  }

  /**
   * @param {boolean} value
   */
  set freeze(value: boolean) {
    this._freeze = value
  }

  /**
   * @return {number}
   */
  get x(): number {
    return this._x
  }

  /**
   * @param {number} value
   */
  set x(value: number) {
    this._x = value
  }

  /**
   * @return {number}
   */
  get y(): number {
    return this._y
  }

  /**
   * @param {number} value
   */
  set y(value: number) {
    this._y = value
  }

  /**
   * @return {EDirection}
   */
  get move(): EDirection {
    return this._move
  }

  /**
   * @param {EDirection} value
   */
  set move(value: EDirection) {
    this._move = value
  }

  /**
   * @return {number}
   */
  get speed(): number {
    return this._speed
  }

  /**
   * @param {number} value
   */
  set speed(value: number) {
    this._speed = value
  }
}
