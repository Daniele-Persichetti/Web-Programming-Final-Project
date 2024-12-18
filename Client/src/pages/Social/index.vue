<script setup lang="ts">
import { ref, onMounted, watch, inject, type Ref } from 'vue'
import type { Workout } from '@/models/types'
import type { User } from '@/models/types'
import FriendsActivityCard from '@/components/FriendsActivityCard.vue'
import { api } from '@/models/myFetch'
import AutoComplete from 'primevue/autocomplete'

const currentUser = inject<Ref<User | null>>('currentUser')!

const friendWorkouts = ref<Array<{ workout: Workout; user: User }>>([])
const searchQuery = ref('')
const searchResults = ref<User[]>([])
const friendStatuses = ref<{ [key: string]: boolean }>({})
const searchLoading = ref(false)

// Handle user search with server-side filtering
async function handleSearch(event: { query: string }) {
  if (!event.query.trim() || event.query.length < 2) {
    searchResults.value = []
    return
  }

  searchLoading.value = true
  try {
    const response = await api<{ data: User[] }>(`users/search/${event.query}`)
    if (response.data) {
      searchResults.value = response.data.filter(user => user.id !== currentUser.value?.id)
    }
  } catch (error) {
    console.error('Error searching users:', error)
    searchResults.value = []
  } finally {
    searchLoading.value = false
  }
}

// Function to add a friend (follow)
async function addFriend(user: User) {
  if (!currentUser.value) return
  
  try {
    await api<void>('friends', {
      userid: currentUser.value.id,
      friendid: user.id
    })
    
    // Update local friend status
    friendStatuses.value[user.id] = true
    await getRecentFriendWorkouts()
  } catch (error) {
    console.error('Error following user:', error)
    alert('Failed to follow user')
  }
}

// Function to remove friend (unfollow)
async function handleRemoveFriend(user: User) {
  if (!currentUser.value) return
  
  try {
    const response = await api<{ data: { message: string } }>(
      `friends/${currentUser.value.id}/${user.id}`, 
      null, 
      'DELETE'
    )
    
    if (response.data) {
      // Update local friend status
      friendStatuses.value[user.id] = false
      await getRecentFriendWorkouts()
    }
  } catch (error) {
    console.error('Error unfollowing user:', error)
    alert('Failed to unfollow user')
  }
}

// Get recent workouts for all friends
async function getRecentFriendWorkouts() {
  if (!currentUser.value) return

  try {
    const response = await api<{ data: Array<Workout & { user: User }> }>(
      `workouts/friends/${currentUser.value.id}`
    )

    if (response.data) {
      friendWorkouts.value = response.data
        .map(data => ({
          workout: {
            id: data.id,
            userid: data.userid,
            type: data.type,
            name: data.name,
            workoutdate: data.workoutdate,
            duration: data.duration,
            distance: data.distance,
            calories: data.calories,
            comment: data.comment
          },
          user: data.user
        }))
        .sort((a, b) => 
          new Date(b.workout.workoutdate + 'T00:00:00').getTime() - 
          new Date(a.workout.workoutdate + 'T00:00:00').getTime()
        )
        .slice(0, 5)
    }
  } catch (error) {
    console.error('Error fetching friend workouts:', error)
  }
}

// Watch for changes in current user
watch(
  () => currentUser.value,
  () => {
    getRecentFriendWorkouts()
  }
)

onMounted(() => {
  if (currentUser.value) {
    getRecentFriendWorkouts()
  }
})
</script>

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
            :key="`${item.workout.userid}-${item.workout.workoutdate}`"
          >
            <FriendsActivityCard :workout="item.workout" :user="item.user" />
          </div>
          <div v-if="friendWorkouts.length === 0" class="no-workouts">
            No recent friend activities to display.
          </div>
        </div>

        <!-- Right Column: Search Friends -->
        <div class="right-column">
          <h2 class="section-title">Search Users</h2>

          <!-- Search Container -->
          <div class="search-container">
            <AutoComplete
              v-model="searchQuery"
              :suggestions="searchResults"
              :delay="300"
              :min-length="2"
              @complete="handleSearch"
              placeholder="Search by name or username..."
              :dropdown="true"
              class="w-full"
              :loading="searchLoading"
              optionLabel="username"
            >
              <template #option="slotProps">
                <div class="user-suggestion">
                  <img 
                    :src="slotProps.option.image" 
                    :alt="slotProps.option.firstname"
                    class="user-suggestion-img"
                  />
                  <div class="user-suggestion-info">
                    <div class="name">
                      {{ slotProps.option.firstname }} {{ slotProps.option.lastname }}
                    </div>
                    <div class="username">@{{ slotProps.option.username }}</div>
                  </div>
                  <div class="action-icons">
                    <button
                      v-if="!friendStatuses[slotProps.option.id]"
                      class="action-button add-friend"
                      @click.stop="addFriend(slotProps.option)"
                    >
                      <i class="fas fa-user-plus"></i>
                      <span>Follow</span>
                    </button>
                    <button
                      v-else
                      class="action-button remove-friend"
                      @click.stop="handleRemoveFriend(slotProps.option)"
                    >
                      <i class="fas fa-user-minus"></i>
                      <span>Unfollow</span>
                    </button>
                  </div>
                </div>
              </template>
            </AutoComplete>
          </div>

          <!-- Search Results Status -->
          <div v-if="searchLoading" class="search-status">
            Searching...
          </div>

          <!-- No Results Message -->
          <div v-else-if="searchQuery && !searchLoading" class="no-results">
            No users found matching your search.
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

/* Friend Badge */
.friend-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  background-color: #2a5934;
  color: white;
  border-radius: 4px;
  font-size: 0.8em;
  margin-top: 4px;
}

/* No Workouts Message */
.no-workouts {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

/* Search Container */
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

/* User Result Styles */
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

/* Action Buttons */
.action-icons {
  display: flex;
  gap: 8px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.2s;
  font-size: 0.9em;
}

.action-button i {
  font-size: 1.1em;
}

.add-friend {
  color: #2a5934;
}

.remove-friend {
  color: #dc3545;
}

.add-friend:hover {
  background-color: rgba(42, 89, 52, 0.1);
}

.remove-friend:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

/* PrimeVue AutoComplete Customization */
:deep(.p-autocomplete) {
  width: 100%;
}

:deep(.p-autocomplete-input) {
  width: 100% !important;
  padding: 12px !important;
  border: 2px solid #2a5934 !important;
  border-radius: 8px !important;
  font-size: 1em !important;
  transition: border-color 0.3s !important;
}

:deep(.p-autocomplete-input:focus) {
  outline: none !important;
  border-color: #1e4727 !important;
  box-shadow: none !important;
}

:deep(.p-autocomplete-panel) {
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  margin-top: 4px !important;
}

/* User Suggestion Styles */
.user-suggestion {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
}

.user-suggestion-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-suggestion-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.user-suggestion-info .name {
  font-weight: 500;
  color: #2a5934;
}

.user-suggestion-info .username {
  font-size: 0.9em;
  color: #666;
}

/* Search Status */
.search-status {
  text-align: center;
  color: #666;
  margin-top: 10px;
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

  .action-icons {
    flex-direction: column;
    gap: 5px;
  }

  .action-button {
    width: 100%;
    justify-content: center;
  }
}
</style>