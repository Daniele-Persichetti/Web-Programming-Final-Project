<script setup lang="ts">
import { ref, onMounted, watch, computed, inject, type Ref } from 'vue'
import { getAll as getAllWorkouts, type Workout } from '@/models/workout'
import { getAll as getAllUsers, type User } from '@/models/users'
import FriendsActivityCard from '@/components/FriendsActivityCard.vue'

const currentUser = inject<Ref<User | null>>('currentUser')!

const friendWorkouts = ref<Array<{ workout: Workout; user: User }>>([])
const searchQuery = ref('')
const recentSearches = ref<User[]>([])
const allUsers = ref<User[]>(getAllUsers().data)

// Check if a user is a friend
function isFriend(userId: number): boolean {
  if (!currentUser.value) return false
  return currentUser.value.friends.includes(userId)
}

// Computed property for filtered search results
const searchResults = computed(() => {
  if (!searchQuery.value || !currentUser.value) return []

  const query = searchQuery.value.toLowerCase()

  return allUsers.value
    .filter(
      (user) =>
        // Don't show current user
        user.id !== currentUser.value?.id &&
        // Search by first name, last name, or username
        (user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query))
    )
    .slice(0, 5) // Limit to 5 results
})

// Function to add a user to recent searches
function addToRecentSearches(user: User) {
  // Remove if already exists
  recentSearches.value = recentSearches.value.filter((u) => u.id !== user.id)
  // Add to beginning of array
  recentSearches.value.unshift(user)
  // Keep only last 5 searches
  recentSearches.value = recentSearches.value.slice(0, 5)
  // Clear search
  searchQuery.value = ''
}

// Function to send friend request
function sendFriendRequest(user: User) {
  alert(`[WIP] Friend request sent to ${user.firstName} ${user.lastName}`)
  addToRecentSearches(user)
}

// Function to view profile
function viewProfile(user: User) {
  alert(`[WIP] Viewing profile of ${user.firstName} ${user.lastName}`)
  addToRecentSearches(user)
}

// Get recent workouts for all friends
function getRecentFriendWorkouts() {
  if (!currentUser.value) return

  const allWorkouts = getAllWorkouts().data
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  // Use friends array directly
  const friendIds = currentUser.value.friends

  // Get recent workouts for each friend
  const friendWorkoutGroups = friendIds.map((friendId) => {
    const friend = allUsers.value.find((user) => user.id === friendId)
    if (!friend) return []

    return allWorkouts
      .filter((workout) => workout.userId === friendId && new Date(workout.date) > oneYearAgo)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map((workout) => ({
        workout,
        user: friend
      }))
  })

  // Combine all friend workouts and sort them
  friendWorkouts.value = friendWorkoutGroups
    .flat()
    .sort((a, b) => new Date(b.workout.date).getTime() - new Date(a.workout.date).getTime())
    .slice(0, 5)
}

// Watch for changes in current user
watch(
  () => currentUser.value,
  () => {
    getRecentFriendWorkouts()
  }
)

onMounted(() => {
  getRecentFriendWorkouts()
})
</script>

<!-- Template remains exactly the same -->
<template>
  <main>
    <div id="social-content" class="content">
      <h1>Social</h1>
      <div class="two-columns">
        <!-- Left Column: Friends Activity -->
        <div class="left-column">
          <h2 class="section-title">Friends Activity</h2>
          <div
            v-for="item in friendWorkouts"
            :key="`${item.workout.userId} - ${item.workout.date}`"
          >
            <FriendsActivityCard :workout="item.workout" :user="item.user" />
          </div>
          <div v-if="friendWorkouts.length === 0" class="no-workouts">
            No recent friend activities to display.
          </div>
        </div>

        <!-- Right Column: Search Friends -->
        <div class="right-column">
          <h2 class="section-title">Search Friends</h2>

          <!-- Search Bar -->
          <div class="search-container">
            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Search by name or username..."
            />
          </div>

          <!-- Search Results -->
          <div v-if="searchQuery && searchResults.length > 0" class="search-results">
            <h3 class="results-title">Search Results</h3>
            <div
              v-for="user in searchResults"
              :key="user.id"
              class="user-result-blurb"
              :class="{ 'is-friend': isFriend(user.id) }"
            >
              <img :src="user.image" :alt="user.firstName" class="user-img" />
              <div class="user-info">
                <h4 class="user-name">{{ user.firstName }} {{ user.lastName }}</h4>
                <p class="username">@{{ user.username }}</p>
                <span v-if="isFriend(user.id)" class="friend-badge">
                  <i class="fas fa-user-check"></i> Friend
                </span>
              </div>
              <div class="action-icons">
                <button
                  v-if="!isFriend(user.id)"
                  class="action-button"
                  @click="sendFriendRequest(user)"
                >
                  <i class="fas fa-user-plus"></i>
                </button>
                <button class="action-button" @click="viewProfile(user)">
                  <i class="fas fa-user-circle"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- No Results Message -->
          <div v-else-if="searchQuery && searchResults.length === 0" class="no-results">
            No users found matching your search.
          </div>

          <!-- Recent Searches -->
          <div v-else-if="recentSearches.length > 0" class="recent-searches">
            <h3 class="results-title">Recent Searches</h3>
            <div
              v-for="user in recentSearches"
              :key="user.id"
              class="user-result-blurb"
              :class="{ 'is-friend': isFriend(user.id) }"
            >
              <img :src="user.image" :alt="user.firstName" class="user-img" />
              <div class="user-info">
                <h4 class="user-name">{{ user.firstName }} {{ user.lastName }}</h4>
                <p class="username">@{{ user.username }}</p>
                <span v-if="isFriend(user.id)" class="friend-badge">
                  <i class="fas fa-user-check"></i> Friend
                </span>
              </div>
              <div class="action-icons">
                <button
                  v-if="!isFriend(user.id)"
                  class="action-button"
                  @click="sendFriendRequest(user)"
                >
                  <i class="fas fa-user-plus"></i>
                </button>
                <button class="action-button" @click="viewProfile(user)">
                  <i class="fas fa-user-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Base Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

h2,
h3 {
  color: #2a5934;
  margin-bottom: 10px;
}

/* Social Content */
#social-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Two Columns Layout */
.two-columns {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
}

.left-column,
.right-column {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  flex: 1 1 calc(50% - 20px);
}

/* Friend Name Header */
.friend-name-header {
  font-size: 1.1em;
  font-weight: bold;
  color: #2a5934;
  margin-bottom: 8px;
  padding-left: 10px;
}

/* No Workouts Message */
.no-workouts {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

/* Search Form Styles */
.form {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-top: 10px;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-button {
  background-color: #2a5934;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #1e4727;
}

/* Recent Search Styles */
.recent-search-blurb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
}

.search-img {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 50%;
}

.search-info {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-name {
  font-size: 1.1em;
}

.action-icons {
  display: flex;
  gap: 10px;
}

.action-icons a {
  color: #2a5934;
  font-size: 1.5em;
  transition: color 0.3s;
}

.action-icons a:hover {
  color: #1e4727;
}

/* Search Styles */
.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #2a5934;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #1e4727;
}

/* Results Styles */
.results-title {
  font-size: 1.1em;
  color: #2a5934;
  margin: 20px 0 15px;
}

.user-result-blurb {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  background-color: #e8f5e9;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: transform 0.2s;
}

.user-result-blurb:hover {
  transform: translateX(5px);
}

.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  margin: 0;
  font-size: 1em;
  color: #2a5934;
}

.username {
  margin: 0;
  font-size: 0.9em;
  color: #666;
}

.action-icons {
  display: flex;
  gap: 8px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #2a5934;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: rgba(42, 89, 52, 0.1);
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

/* Responsive Design */
@media screen and (max-width: 767px) {
  #social-content {
    padding: 10px;
  }

  .two-columns {
    display: block;
  }

  .left-column,
  .right-column {
    flex: 1 1 100%;
    margin-bottom: 20px;
  }

  .recent-search-blurb {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-icons {
    margin-top: 10px;
  }
}
</style>
