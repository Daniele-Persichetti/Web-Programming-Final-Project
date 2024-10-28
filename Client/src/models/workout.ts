import data from '../data/workout.json'
import type { DataListEnvelope } from './dataEnvelope'

export interface Workout {
  userId: number
  type: string
  name: string
  date: string
  duration: number
  distance: number
  calories: number
  comment: string
}

export function getAll(): DataListEnvelope<Workout> {
  return {
    data: data.workouts as Workout[]
  }
}
