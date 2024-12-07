export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  username: string
  role: string | null
  phone: string | null
  age: number | null
  birthdate: string | null
  gender: string | null
  image: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  ip: string | null
  macaddress: string | null
}

export interface Friend {
  userid: string
  friendid: string
  status: string
}

export interface Workout {
  id: string
  userid: string | null
  type: string
  name: string
  workoutdate: string
  duration: number
  distance: number | null
  calories: number | null
  comment: string | null
}
