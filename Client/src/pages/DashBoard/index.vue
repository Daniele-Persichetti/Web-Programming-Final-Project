<script setup lang="ts">
import { ref, onMounted, computed, watch, inject, type Ref } from 'vue'
import { getByUserId, create, update, remove } from '@/models/workout'
import WorkoutCard from '@/components/WorkoutCard.vue'
import type { User, Workout } from '@/models/types'
import WorkoutEdit from '@/components/WorkoutEdit.vue'

const currentUser = inject<Ref<User | null>>('currentUser')!

interface WorkoutStats {
  mostCommonType: string
  totalDuration: number
  totalDistance: number
  totalCalories: number
  workoutCount: number
}

// Form data
const formData = ref<Omit<Workout, 'id'>>({
  userid: currentUser.value?.id || '',  
  type: 'Cardio',
  name: '',
  workoutdate: new Date().toISOString().split('T')[0],
  duration: 0,
  distance: null,
  calories: null,
  comment: null
})

const todayStats = ref<WorkoutStats>({
  mostCommonType: '',
  totalDuration: 0,
  totalDistance: 0,
  totalCalories: 0,
  workoutCount: 0
})

const weekStats = ref<WorkoutStats>({
  mostCommonType: '',
  totalDuration: 0,
  totalDistance: 0,
  totalCalories: 0,
  workoutCount: 0
})

const allTimeStats = ref<WorkoutStats>({
  mostCommonType: '',
  totalDuration: 0,
  totalDistance: 0,
  totalCalories: 0,
  workoutCount: 0
})

const userWorkouts = ref<Workout[]>([])
const totalUserWorkouts = ref(0)

const showEditModal = ref(false)
const workoutToEdit = ref<Workout | null>(null)

function calculateStats(workouts: Workout[]): WorkoutStats {
  if (workouts.length === 0) {
    return {
      mostCommonType: 'N/A',
      totalDuration: 0,
      totalDistance: 0,
      totalCalories: 0,
      workoutCount: 0
    }
  }

  const typeCount: Record<string, number> = {}
  let totalDuration = 0
  let totalDistance = 0
  let totalCalories = 0

  workouts.forEach((workout) => {
    typeCount[workout.type] = (typeCount[workout.type] || 0) + 1
    totalDuration += workout.duration
    totalDistance += workout.distance || 0
    totalCalories += workout.calories || 0
  })

  const mostCommonType = Object.entries(typeCount).reduce((a, b) => (a[1] > b[1] ? a : b))[0]

  return {
    mostCommonType,
    totalDuration,
    totalDistance,
    totalCalories,
    workoutCount: workouts.length
  }
}

function filterWorkoutsByDate(workouts: Workout[], startDate: Date, endDate: Date): Workout[] {
  return workouts.filter((workout) => {
    // Add T00:00:00 to force local timezone interpretation
    const workoutDate = new Date(workout.workoutdate + 'T00:00:00')
    return workoutDate >= startDate && workoutDate <= endDate
  })
}

const recentWorkouts = computed(() => {
  return [...userWorkouts.value]
    .sort((a, b) => new Date(b.workoutdate).getTime() - new Date(a.workoutdate).getTime())
    .slice(0, 3)
})

async function handleSubmit(event: Event) {
  event.preventDefault()

  if (!currentUser.value) {
    console.error('No user logged in')
    return
  }

  try {
    const newWorkoutData = {
      userid: currentUser.value.id,
      type: formData.value.type,
      name: formData.value.name,
      workoutdate: formData.value.workoutdate,
      duration: formData.value.duration,
      distance: formData.value.distance || null,
      calories: formData.value.calories || null,
      comment: formData.value.comment || null
    }

    const response = await create(newWorkoutData)
    if (!response.error) {
      userWorkouts.value.unshift(response.data)
      totalUserWorkouts.value++
      updateStats()
      formData.value = {
        userid: currentUser.value.id,
        type: 'Cardio',
        name: '',
        workoutdate: new Date().toISOString(),
        duration: 0,
        distance: null,
        calories: null,
        comment: null
      }
    }
  } catch (error) {
    console.error('Error creating workout:', error)
  }
}

function updateStats() {
  const now = new Date()
  // Set to start of day in local timezone
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

  // Force end of day for the current date to include all of today's workouts
  now.setHours(23, 59, 59, 999)

  const todayWorkouts = filterWorkoutsByDate(userWorkouts.value, todayStart, now)
  const weekWorkouts = filterWorkoutsByDate(userWorkouts.value, weekStart, now)

  todayStats.value = calculateStats(todayWorkouts)
  weekStats.value = calculateStats(weekWorkouts)
  allTimeStats.value = calculateStats(userWorkouts.value)
}

async function loadUserWorkouts() {
  if (!currentUser.value) return

  try {
    const response = await getByUserId(currentUser.value.id)
    if (!response.error) {
      userWorkouts.value = response.data
      totalUserWorkouts.value = userWorkouts.value.length
      updateStats()
    }
  } catch (error) {
    console.error('Error fetching workouts:', error)
  }
}

function handleEditWorkout(workout: Workout) {
  workoutToEdit.value = workout
  showEditModal.value = true
}

async function handleDeleteWorkout(workout: Workout) {
  if (confirm('Are you sure you want to delete this workout?')) {
    try {
      const response = await remove(workout.id)
      if (!response.error) {
        userWorkouts.value = userWorkouts.value.filter(w => w.id !== workout.id)
        totalUserWorkouts.value--
        updateStats()
      }
    } catch (error) {
      console.error('Error deleting workout:', error)
    }
  }
}

async function handleSaveEdit(updatedWorkout: Workout) {
  try {
    const response = await update(updatedWorkout.id, {
      type: updatedWorkout.type,
      name: updatedWorkout.name,
      workoutdate: updatedWorkout.workoutdate,
      duration: updatedWorkout.duration,
      distance: updatedWorkout.distance,
      calories: updatedWorkout.calories,
      comment: updatedWorkout.comment
    })
    
    if (!response.error) {
      const index = userWorkouts.value.findIndex(w => w.id === updatedWorkout.id)
      if (index !== -1) {
        userWorkouts.value[index] = response.data
        updateStats()
      }
    }
    showEditModal.value = false
    workoutToEdit.value = null
  } catch (error) {
    console.error('Error updating workout:', error)
  }
}

watch(
  () => currentUser.value,
  () => {
    loadUserWorkouts()
  }
)

onMounted(() => {
  loadUserWorkouts()
})
</script>

<template>
  <main>
    <div id="dashboard-content" class="content">
      <h1>Dashboard</h1>
      <div id="stats-overview" class="stats-overview">
        <div class="stats-box" id="today-stats">
          <h3 class="stats-title">Today</h3>
          <p class="stats-item">Most common type of Workout: {{ todayStats.mostCommonType }}</p>
          <p class="stats-item">Duration: {{ todayStats.totalDuration }} minutes</p>
          <p class="stats-item">Distance: {{ todayStats.totalDistance.toFixed(2) }} km</p>
          <p class="stats-item">Calories Burnt: {{ todayStats.totalCalories }} kcal</p>
        </div>
        <div class="stats-box" id="week-stats">
          <h3 class="stats-title">This Week</h3>
          <p class="stats-item">Most common type of Workout: {{ weekStats.mostCommonType }}</p>
          <p class="stats-item">Duration: {{ weekStats.totalDuration }} minutes</p>
          <p class="stats-item">Distance: {{ weekStats.totalDistance.toFixed(2) }} km</p>
          <p class="stats-item">Calories Burnt: {{ weekStats.totalCalories }} kcal</p>
        </div>
        <div class="stats-box" id="all-time-stats">
          <h3 class="stats-title">All Time</h3>
          <p class="stats-item">Most common type of Workout: {{ allTimeStats.mostCommonType }}</p>
          <p class="stats-item">Duration: {{ allTimeStats.totalDuration }} minutes</p>
          <p class="stats-item">Distance: {{ allTimeStats.totalDistance.toFixed(2) }} km</p>
          <p class="stats-item">Calories Burnt: {{ allTimeStats.totalCalories }} kcal</p>
        </div>
      </div>

      <div class="two-columns">
        <div class="left-column">
          <h2 class="section-title">My Recent Activity</h2>
          <WorkoutCard
            v-for="workout in recentWorkouts"
            :key="workout.id"
            :workout="workout"
            @edit-workout="handleEditWorkout"
            @delete-workout="handleDeleteWorkout"
          />
        </div>

        <div class="right-column">
          <h2 class="section-title">Add a New Workout</h2>
          <form id="add-workout-form" class="form" @submit="handleSubmit">
            <label for="workout-type" class="form-label">Type of Workout:</label>
            <select id="workout-type" v-model="formData.type" class="form-select" required>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Balance">Balance</option>
            </select>

            <label for="workout-name" class="form-label">Workout Name:</label>
            <input
              type="text"
              id="workout-name"
              v-model="formData.name"
              class="form-input"
              required
            />

            <label for="workout-date" class="form-label">Date:</label>
            <input
              type="date"
              id="workout-date"
              :value="formData.workoutdate.split('T')[0]"
              @input="(e) => (formData.workoutdate = new Date((e.target as HTMLInputElement).value).toISOString())"
              class="form-input"
              required
            />

            <label for="workout-duration" class="form-label">Duration (minutes):</label>
            <input
              type="number"
              id="workout-duration"
              v-model="formData.duration"
              class="form-input"
              required
            />

            <label for="workout-distance" class="form-label">Distance (if applicable, km):</label>
            <input
              type="number"
              id="workout-distance"
              v-model="formData.distance"
              class="form-input"
              step="0.01"
            />

            <label for="calories-burned" class="form-label">Calories Burned:</label>
            <input
              type="number"
              id="calories-burned"
              v-model="formData.calories"
              class="form-input"
            />

            <label for="workout-notes" class="form-label">Additional Notes:</label>
            <textarea
              id="workout-notes"
              v-model="formData.comment"
              class="form-textarea"
              rows="4"
            ></textarea>

            <button type="submit" class="form-button">Add Workout</button>
          </form>
        </div>
      </div>
    </div>

    <WorkoutEdit
      :show="showEditModal"
      :workout="workoutToEdit"
      @close="showEditModal = false"
      @save="handleSaveEdit"
    />
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

p {
  color: #555;
}

ul {
  padding: 0;
  list-style-type: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Dashboard Styles */
#dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Stats Overview Styles */
.stats-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.stats-box {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  flex: 1 1 calc(33.333% - 20px);
  /* Three equal columns */
  box-sizing: border-box;
}

.stats-title {
  font-size: 1.2em;
  color: #2a5934;
  margin-bottom: 10px;
}

.stats-item {
  color: #555;
  margin-bottom: 5px;
}

/* Two Columns Layout */
.two-columns {
  display: flex;
  flex-wrap: wrap;
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

/* Workout Form Styles */
.form {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-top: 10px;
}

.form-input,
.form-select,
.form-textarea {
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

/* Responsive Design */

/* Mobile Layout */
@media screen and (max-width: 767px) {
  #dashboard-content {
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

  .workout-blurb {
    flex-direction: column;
    align-items: flex-start;
  }

  .workout-img {
    margin-bottom: 10px;
  }
}

/* Tablet Landscape and Desktop Layout */
@media screen and (min-width: 768px) {
  .two-columns {
    display: flex;
  }

  .left-column,
  .right-column {
    flex: 1 1 calc(50% - 20px);
  }
}

@media screen and (min-width: 1200px) {
  #dashboard-content {
    padding: 20px;
  }

  .two-columns {
    gap: 30px;
  }
}
</style>
