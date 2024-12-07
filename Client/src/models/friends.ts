import { api } from '@/models/myFetch'
import type { Friend, User } from './types'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'

export interface FriendWithUser extends Friend {
  friend: User
}

export function getUserFriends(userId: string): Promise<DataListEnvelope<FriendWithUser>> {
  return api(`friends/user/${userId}`)
}

export function getFriendshipStatus(
  userId: string,
  friendId: string
): Promise<DataEnvelope<boolean>> {
  return api(`friends/status/${userId}/${friendId}`)
}

export function addFriend(userId: string, friendId: string): Promise<DataEnvelope<Friend>> {
  return api('friends', { userid: userId, friendid: friendId })
}

export function removeFriend(
  userId: string,
  friendId: string
): Promise<DataEnvelope<{ message: string }>> {
  return api(`friends/${userId}/${friendId}`, null, 'DELETE')
}
