import { type EDirection } from '../enum/EDirection'

export interface IPaddle {
  x: number
  y: number
  move?: EDirection
  speed?: number
}
