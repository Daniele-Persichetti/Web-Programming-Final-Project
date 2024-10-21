<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAll, type Workout } from '@/models/workout'

// Replace this with actual user ID retrieval
const userId = ref(1)

interface WorkoutStats {
  mostCommonType: string
  totalDuration: number
  totalDistance: number
  totalCalories: number
  workoutCount: number
}

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

// Function to get the appropriate icon class for each workout type
function getWorkoutIconClass(type: string): string {
  switch (type.toLowerCase()) {
    case 'cardio':
      return 'fa-solid fa-heart-circle-bolt'
    case 'strength':
      return 'fa-solid fa-dumbbell'
    case 'flexibility':
      return 'fa-solid fa-person-running'
    case 'balance':
      return 'fa-solid fa-scale-balanced'
    default:
      return 'fa-solid fa-question'
  }
}

//Function to calculate the stats
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
    totalDuration += workout.duration / workouts.length
    totalDistance += workout.distance
    totalCalories += workout.calories
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

//Function to filter data for a certain time frame
function filterWorkoutsByDate(workouts: Workout[], startDate: Date, endDate: Date): Workout[] {
  return workouts.filter((workout) => {
    const workoutDate = new Date(workout.date)
    return workoutDate >= startDate && workoutDate <= endDate
  })
}

//function to sort the workouts based on time
const recentWorkouts = computed(() => {
  return [...userWorkouts.value]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
})

// function runs when the component is mounted. It fetches all workouts,
// filters them for the current user, and calculates workout statistics for
// today, this week, and all time.
onMounted(async () => {
  const result = await getAll()
  if (result.error) {
    console.error('Error fetching workouts:', result.error)
    return
  }

  userWorkouts.value = result.data.filter((workout) => workout.id === userId.value)
  totalUserWorkouts.value = userWorkouts.value.length

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

  const todayWorkouts = filterWorkoutsByDate(userWorkouts.value, todayStart, now)
  const weekWorkouts = filterWorkoutsByDate(userWorkouts.value, weekStart, now)

  todayStats.value = calculateStats(todayWorkouts)
  weekStats.value = calculateStats(weekWorkouts)
  allTimeStats.value = calculateStats(userWorkouts.value)
})
</script>

<template>
  <main>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <div id="dashboard-content" class="content">
      <h1>Dashboard</h1>
      <!-- First Section: Workout Statistics Chart -->
      <div id="stats-overview" class="stats-overview">
        <!-- Three Columns for Daily, Weekly, and All Time Stats -->
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
      <!-- Second Section: Two Columns -->
      <div class="two-columns">
        <!-- First Column: My Activity -->
        <div class="left-column">
          <h2 class="section-title">My Recent Activity</h2>

          <!-- Workout Blurbs -->
          <div class="workout-blurb" v-for="workout in recentWorkouts" :key="workout.date">
            <div class="workout-img">
              <i :class="getWorkoutIconClass(workout.type)"></i>
            </div>
            <div class="workout-info">
              <h3 class="workout-title">{{ workout.name }}</h3>
              <p class="workout-description">{{ workout.comment }}</p>
              <ul class="workout-details">
                <li>Type: {{ workout.type }}</li>
                <li>Date: {{ new Date(workout.date).toLocaleDateString() }}</li>
                <li>Duration: {{ workout.duration }} minutes</li>
                <li v-if="workout.type === 'Cardio'">
                  Distance: {{ workout.distance.toFixed(2) }} km
                </li>
                <li>Calories Burned: {{ workout.calories }} kcal</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Second Column: Add Workout Form -->
        <div class="right-column">
          <h2 class="section-title">Add a New Workout</h2>
          <form id="add-workout-form" class="form" action="#">
            <label for="workout-type" class="form-label">Type of Workout:</label>
            <select id="workout-type" name="workout-type" class="form-select">
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Flexibility">Flexibility</option>
              <option value="Balance">Balance</option>
            </select>

            <label for="workout-name" class="form-label">Workout Name:</label>
            <input type="text" id="workout-name" name="workout-name" class="form-input" required />

            <label for="workout-date" class="form-label">Date:</label>
            <input type="date" id="workout-date" name="workout-date" class="form-input" required />

            <label for="workout-duration" class="form-label">Duration (minutes):</label>
            <input
              type="number"
              id="workout-duration"
              name="workout-duration"
              class="form-input"
              required
            />

            <label for="workout-distance" class="form-label">Distance (if applicable, km):</label>
            <input
              type="number"
              id="workout-distance"
              name="workout-distance"
              class="form-input"
              step="0.01"
            />

            <label for="calories-burned" class="form-label">Calories Burned:</label>
            <input type="number" id="calories-burned" name="calories-burned" class="form-input" />

            <label for="workout-notes" class="form-label">Additional Notes:</label>
            <textarea
              id="workout-notes"
              name="workout-notes"
              class="form-textarea"
              rows="4"
            ></textarea>

            <button type="submit" class="form-button">Add Workout</button>
          </form>
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

/* Workout Blurb Styles */
.workout-blurb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
}

.workoutBalance-img {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 50%;
  color: black;
}

.workoutStrength-img {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 50%;
  color: black;
}

.workoutFlexibility-img {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 50%;
  color: black;
}

.workout-img {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 50%;
  color: black;
}

.workout-img i {
  color: black !important;
  font-size: 50px;
}

.workout-info {
  flex-grow: 1;
}

.workout-title {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #2a5934;
}

.workout-description,
.workout-details li {
  color: #555;
}

/* Add Workout Form Styles */
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
