import { api } from './myFetch'
import type { User } from './types'
import type { DataEnvelope } from './dataEnvelope'

interface AuthResponse {
  data: User
  error?: string
}

export async function login(email: string, password: string): Promise<DataEnvelope<User>> {
  try {
    console.log('1. Starting login request')
    const response = await api<AuthResponse>('auth/login', { email, password })
    console.log('2. Login response:', response)

    if (response.error) {
      return { error: response.error, data: null as any }
    }

    if (!response.data) {
      return { error: 'No data received', data: null as any }
    }

    return { data: response.data }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Error fetching user data', data: null as any }
  }
}

export async function register(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
  username: string
}): Promise<DataEnvelope<User>> {
  try {
    // Transform the data to match server expectations
    const serverData = {
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: userData.email,
      password: userData.password,
      username: userData.username,
      role: 'user',
      image: 'https://dummyjson.com/icon/user/128',
      ip: '0.0.0.0',
      macaddress: '00:00:00:00:00:00'
    }

    console.log('Sending registration data:', serverData)
    const response = await api<AuthResponse>('auth/register', serverData)

    if (response.error) {
      console.error('Registration error:', response.error)
      return { error: response.error, data: null as any }
    }

    return { data: response.data! }
  } catch (error: any) {
    console.error('Registration failed:', error)
    return { error: error.message || 'Registration failed', data: null as any }
  }
}

export async function logout(): Promise<void> {
  return api('auth/logout', null, 'POST')
}

export async function verifySession(userId: string): Promise<DataEnvelope<User>> {
  try {
    const response = await api<AuthResponse>(`auth/verify?userId=${userId}`)
    if (response.error) {
      return { error: response.error, data: null as any }
    }
    return { data: response.data! }
  } catch (error) {
    return { error: 'Session verification failed', data: null as any }
  }
}
