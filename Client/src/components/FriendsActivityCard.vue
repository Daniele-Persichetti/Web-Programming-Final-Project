<script setup lang="ts">
import type { Workout, User } from '@/models/types'

const props = defineProps<{
  workout: Workout
  user: User
}>()

function formatDate(workoutDate: string): string {
  const date = new Date(workoutDate + 'T00:00:00')
  return date.toLocaleDateString()
}
</script>

<template>
  <div class="activity-blurb">
    <div class="user-section">
      <img :src="user.image ?? undefined" :alt="user.firstname" class="user-img" />
      <div class="user-name">{{ user.firstname }} {{ user.lastname }}</div>
    </div>

    <div class="workout-info">
      <div class="workout-header">
        <h3 class="workout-title">{{ workout.name }}</h3>
      </div>
      <p class="workout-description">{{ workout.comment }}</p>
      <ul class="workout-details">
        <li>
          <i class="fas fa-running"></i>
          Type: {{ workout.type }}
        </li>
        <li>
          <i class="fas fa-calendar"></i>
          Date: {{ formatDate(workout.workoutdate) }}
        </li>
        <li>
          <i class="fas fa-clock"></i>
          Duration: {{ workout.duration }} minutes
        </li>
        <li v-if="workout.type === 'Cardio'">
          <i class="fas fa-road"></i>
          Distance: {{ workout.distance?.toFixed(2) }} km
        </li>
        <li>
          <i class="fas fa-fire"></i>
          Calories Burned: {{ workout.calories }} kcal
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.activity-blurb {
  display: flex;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
  gap: 20px;
}

/* User Section Styles */
.user-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.user-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2a5934;
  margin-bottom: 8px;
}

.user-name {
  font-weight: 600;
  color: #2a5934;
  text-align: center;
  font-size: 0.9em;
}

/* Workout Info Styles */
.workout-info {
  flex-grow: 1;
}

.workout-header {
  margin-bottom: 10px;
}

.workout-title {
  font-size: 1.2em;
  color: #2a5934;
  margin: 0;
}

.workout-description {
  color: #555;
  margin-bottom: 10px;
}

.workout-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.workout-details li {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  color: #555;
}

.workout-details i {
  width: 20px;
  margin-right: 8px;
  color: #2a5934;
}

/* Responsive Design */
@media screen and (max-width: 767px) {
  .activity-blurb {
    flex-direction: column;
    padding: 12px;
  }

  .user-section {
    flex-direction: row;
    gap: 12px;
    margin-bottom: 12px;
  }

  .user-img {
    margin-bottom: 0;
  }

  .user-name {
    font-size: 1em;
  }
}
</style>
