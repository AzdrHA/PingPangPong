import DefaultGame from './DefaultGame'
import { Player } from './Player'
import Ball from './Ball'

/**
 * Class Game
 */
export default class Game extends DefaultGame {
  private readonly player: Player
  private readonly ball: Ball

  /** o
   * @constructor
   * @public
   */
  public constructor() {
    super()

    this.player = new Player({
      name: 'Jean Pierre',
      x: 150,
      y: this.canvas.height / 2 - Player.HEIGHT / 2,
    })

    this.ball = new Ball()

    this.startMenu()
    this.hotReload()
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
    this.player.freeze = false
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
    this.context.fillRect(
      this.player.x,
      this.player.y,
      Player.WIDTH,
      Player.HEIGHT
    )
  }
}
