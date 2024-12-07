import { api } from '@/models/myFetch'
import type { Workout } from './types'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'

export function newWorkout(userid: string): Omit<Workout, 'id'> {
  return {
    userid: userid,
    type: 'Cardio',
    name: '',
    workoutdate: new Date().toISOString(),
    duration: 0,
    distance: null,
    calories: null,
    comment: null
  }
}

export function getAll(): Promise<DataListEnvelope<Workout>> {
  return api('workouts')
}

export function getByUserId(userId: string): Promise<DataListEnvelope<Workout>> {
  return api(`workouts/user/${userId}`)
}

export function create(workout: Omit<Workout, 'id'>): Promise<DataEnvelope<Workout>> {
  return api('workouts', workout)
}

export function update(id: string, workout: Partial<Workout>): Promise<DataEnvelope<Workout>> {
  return api(`workouts/${id}`, workout, 'PATCH')
}

export function remove(id: string): Promise<DataEnvelope<{ message: string }>> {
  return api(`workouts/${id}`, null, 'DELETE')
}
