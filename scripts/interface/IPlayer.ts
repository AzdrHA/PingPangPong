import { type EDirection } from '../enum/EDirection'

export interface IPlayer {
  x: number
  y: number
  move?: EDirection
  speed?: number
  name: string
}
