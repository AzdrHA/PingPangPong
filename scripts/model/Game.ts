import DefaultGame from './DefaultGame'
import { Player } from './Player'
import Ball from './Ball'
import { EPlayerSide } from '../interface/IPlayer'

/**
 * Class Game
 */
export default class Game extends DefaultGame {
  private readonly ball: Ball
  private readonly players: Player[] = []

  /** o
   * @constructor
   * @public
   */
  public constructor() {
    super()

    this.ball = new Ball()

    this.addPlayer(
      new Player({
        name: 'Jean Pierre',
      })
    )

    this.addPlayer(
      new Player({
        name: 'Jean Pierre',
      })
    )

    this.startMenu()
    this.hotReload()
  }

  /**
   * @return {void}
   * @param {void} player
   * @private
   */
  private addPlayer(player: Player): void {
    if (this.players.length === 4) throw Error('Ton père')
    player.side = this.players.length

    if (this.players.length + 1 <= 2) {
      if (player.side === EPlayerSide.LEFT) {
        player.x = 150
        player.y = this.canvas.height / 2 - Player.HEIGHT / 2
      } else if (player.side === EPlayerSide.RIGHT) {
        player.x = this.canvas.width - 150 - Player.WIDTH
        player.y = this.canvas.height / 2 - Player.HEIGHT / 2
      }
    } else {
      if (player.side === EPlayerSide.SECOND_RIGHT) {
        player.x = this.canvas.width - 150 * 2 - Player.WIDTH
        player.y = this.canvas.height / 2 - Player.HEIGHT / 2
      } else if (player.side === EPlayerSide.SECOND_LEFT) {
        player.x = 150 * 2
        player.y = this.canvas.height / 2 - Player.HEIGHT / 2
      }
    }

    this.players.push(player)
    this.ball.addPlayer(player)
  }

  /**
   * @return {void}
   * @private
   */
  private loop(): void {
    this.draw()
  }

  /**
   * @return {void}
   * @private
   */
  private startGame(): void {
    this.players.map(player => (player.freeze = false))
    this.ball.freeze = false
    this.running = true
    setInterval(() => {
      this.loop()
    })
  }

  /**
   * @return {void}
   * @private
   */
  private hotReload(): void {
    document.addEventListener('keydown', key => {
      if (key.key === 'Enter' && !this.running) {
        this.startGame()
      }
    })
  }

  /**
   * @return {void}
   * @private
   */
  private startMenu(): void {
    this.draw()
  }

  /**
   * @return {void}
   * @private
   */
  private draw(): void {
    this.drawTerrain()

    this.context.fillStyle = '#ffffff'
    this.players.forEach(player => {
      this.context.fillRect(player.x, player.y, Player.WIDTH, Player.HEIGHT)
    })

    this.context.fillRect(this.ball.x, this.ball.y, Ball.WIDTH, Ball.HEIGHT)
  }
}
