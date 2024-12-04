import data from '../data/workout.json'
import type { DataListEnvelope } from './dataEnvelope'

export interface Workout {
  userId: number
  type: string
  name: string
  date: Date
  duration: number
  distance: number
  calories: number
  comment: string
}

export function newWorkout(userId: number): Workout {
  return {
    userId,
    type: 'Cardio',
    name: '',
    date: new Date(),
    duration: 0,
    distance: 0,
    calories: 0,
    comment: ''
  }
}

export function getAll(): DataListEnvelope<Workout> {
  return {
    data: data.workouts.map((x) => ({
      ...x,
      date: new Date(x.date)
    })) as Workout[]
  }
}
