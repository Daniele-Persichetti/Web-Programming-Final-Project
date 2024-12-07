import { api } from '@/models/myFetch'
import type { User } from './types'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'

export function getAll(): Promise<DataListEnvelope<User>> {
  return api('users')
}

export function get(id: string): Promise<DataEnvelope<User>> {
  return api(`users/${id}`)
}

export function update(id: string, user: Partial<User>): Promise<DataEnvelope<User>> {
  return api(`users/${id}`, user, 'PATCH')
}

export function create(user: Omit<User, 'id' | 'created_at'>): Promise<DataEnvelope<User>> {
  return api('users', user)
}

export function remove(id: string): Promise<DataEnvelope<{ message: string }>> {
  return api(`users/${id}`, null, 'DELETE')
}
