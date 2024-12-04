import data from '../data/users.json'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'

export interface Address {
  address: string
  city: string
  state: string
  country: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  age: number
  birthDate: string
  gender: string
  email: string
  phone: string
  image: string
  address: Address
  username: string
  password: string
  ip: string
  macAddress: string
  friends: number[]
  role: string
}

export function getAll(): DataListEnvelope<User> {
  return {
    data: data.users as User[]
  }
}

export function getById(id: number): DataEnvelope<User | undefined> {
  const user = data.users.find((u: User) => u.id === id)
  return {
    data: user
  }
}

export function getByUsername(username: string): DataEnvelope<User | undefined> {
  const user = data.users.find((u: User) => u.username === username)
  return {
    data: user
  }
}
