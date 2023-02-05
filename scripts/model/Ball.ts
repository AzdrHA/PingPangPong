import DefaultModel from './DefaultModel'
import { EDirection } from '../enum/EDirection'
import { Player } from './Player'
import { EPlayerSide } from '../interface/IPlayer'

/**
 * Class Ball
 */
export default class Ball extends DefaultModel {
  get turn(): EDirection | null {
    return this._turn
  }

  set turn(value: EDirection | null) {
    this._turn = value
  }

  public static WIDTH = 18
  public static HEIGHT = 18

  private _x: number | undefined
  private _y: number | undefined
  private _moveX: EDirection | undefined
  private _moveY: EDirection | undefined
  private _speed: number | undefined
  private _players: Player[] = []
  private _freeze: boolean = true
  private _turn: EDirection | null = EDirection.RIGHT

  private readonly RIGHT_PLAYERS = [EPlayerSide.RIGHT, EPlayerSide.SECOND_RIGHT]
  private readonly LEFT_PLAYERS = [EPlayerSide.LEFT, EPlayerSide.SECOND_LEFT]

  /**
   * @constructor
   * @public
   */
  public constructor() {
    super()

    this.defaultData()

    setInterval(() => {
      this.refreshRate()
    })
  }

  /**
   * @return {void}
   * @private
   */
  private defaultData(): void {
    this._x = this.canvas.width / 2 - 9
    this._y = this.canvas.height / 2 - 9
    this._moveX = EDirection.IDLE
    this._moveY = EDirection.IDLE
    this._speed = 3
  }

  /**
   * @return {void}
   * @private
   */
  private refreshRate(): void {
    if (!this.freeze) {
      this.checkSidesCollides()
      this.launchBall()
      this.moveBall()
      this.checkPlayersCollides()
    }
  }

  private increaseSpeed(): void {
    this.speed += 0.02
  }

  private checkPlayersCollides(): void {
    this.players.forEach(player => {
      if (
        this.x - Ball.WIDTH <= player.x &&
        this.x >= player.x - Player.WIDTH &&
        this.y <= player.y + Player.HEIGHT &&
        this.y + Ball.HEIGHT >= player.y &&
        this.RIGHT_PLAYERS.includes(player.side)
      ) {
        this.x = player.x - Ball.WIDTH
        this.moveX = EDirection.LEFT
        this.increaseSpeed()
      } else if (
        this.x - Ball.WIDTH <= player.x &&
        this.x >= player.x - Player.WIDTH &&
        this.y <= player.y + Player.HEIGHT &&
        this.y + Ball.HEIGHT >= player.y &&
        this.LEFT_PLAYERS.includes(player.side)
      ) {
        this.x = player.x + Ball.WIDTH
        this.moveX = EDirection.RIGHT
        this.increaseSpeed()
      }
    })
  }

  /**
   * @return {void}
   * @private
   */
  private moveBall(): void {
    // Move ball in intended direction based on moveY and moveX values
    if (this.moveY === EDirection.UP) this.y -= this.speed / 1.5
    else if (this.moveY === EDirection.DOWN) this.y += this.speed / 1.5
    if (this.moveX === EDirection.LEFT) this.x -= this.speed
    else if (this.moveX === EDirection.RIGHT) this.x += this.speed
  }

  /**
   * @return {void}
   * @private
   */
  private launchBall(): void {
    if (this.turn !== null) {
      this.moveX = this.turn
      this.moveY = [EDirection.UP, EDirection.DOWN][Math.round(Math.random())]
      this.y = Math.floor(Math.random() * this.canvas.height - 200) + 200
      this.turn = null
    }
  }

  private winPoint(winner: EDirection, loser: EDirection): void {
    this.defaultData()
    this.turn = loser
    this.launchBall()
  }

  /**
   * @return {void}
   * @private
   */
  private checkSidesCollides(): void {
    // If the ball collides with the bound limits - correct the x and y coords.
    if (this.x <= 0) this.winPoint(EDirection.RIGHT, EDirection.LEFT)
    if (this.x >= this.canvas.width - Ball.WIDTH)
      this.winPoint(EDirection.LEFT, EDirection.RIGHT)
    if (this.y <= 0) this.moveY = EDirection.DOWN
    if (this.y >= this.canvas.height - Ball.HEIGHT) this.moveY = EDirection.UP
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
