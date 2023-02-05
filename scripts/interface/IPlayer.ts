import { type EDirection } from '../enum/EDirection'

export enum EPlayerSide {
  LEFT,
  RIGHT,
  SECOND_LEFT,
  SECOND_RIGHT,
}

export interface IPlayer {
  x?: number
  y?: number
  move?: EDirection
  speed?: number
  name: string
}
