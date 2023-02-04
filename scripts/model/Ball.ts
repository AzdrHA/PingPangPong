import DefaultModel from './DefaultModel'
import { EDirection } from '../enum/EDirection'
import { type Player } from './Player'

/**
 * Class Ball
 */
export default class Ball extends DefaultModel {
  public static WIDTH = 18
  public static HEIGHT = 18

  private _x: number
  private _y: number
  private _moveX: EDirection
  private _moveY: EDirection
  private _speed: number
  private _players: Player[] = []

  /**
   * @constructor
   * @public
   */
  public constructor() {
    super()

    this._x = this.canvas.width / 2 - 9
    this._y = this.canvas.height / 2 - 9
    this._moveX = EDirection.IDLE
    this._moveY = EDirection.IDLE
    this._speed = 9
  }

  /**
   * @return {Player[]}
   */
  get players(): Player[] {
    return this._players
  }

  /**
   * @param {Player[]} value
   */
  set players(value: Player[]) {
    this._players = value
  }

  /**
   * @return {Ball}
   * @param {Player} player
   */
  public addPlayer(player: Player): Ball {
    if (this._players.includes(player)) return this
    this._players.push(player)
    return this
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
  get moveX(): EDirection {
    return this._moveX
  }

  /**
   * @param {EDirection} value
   */
  set moveX(value: EDirection) {
    this._moveX = value
  }

  /**
   * @return {EDirection}
   */
  get moveY(): EDirection {
    return this._moveY
  }

  /**
   * @param {EDirection} value
   */
  set moveY(value: EDirection) {
    this._moveY = value
  }

  /**
   * @return {number}
   */
  get speed(): number {
    return this._speed
  }

  set speed(value: number) {
    this._speed = value
  }
}
