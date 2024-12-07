<script setup lang="ts">
import type { Workout } from '@/models/types'

const props = defineProps<{
  workout: Workout
}>()

const emit = defineEmits<{
  'edit-workout': [workout: Workout]
  'delete-workout': [workout: Workout]
}>()

function formatDate(dateStr: string): string {
  // Add time to force local timezone interpretation
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString();
}

function getWorkoutIconClass(type: string): string {
  switch (type.toLowerCase()) {
    case 'cardio':
      return 'fas fa-heartbeat'
    case 'strength':
      return 'fas fa-dumbbell'
    case 'flexibility':
      return 'fas fa-running'
    case 'balance':
      return 'fas fa-scale-balanced'
    default:
      return 'fas fa-question'
  }
}
</script>

<template>
  <div class="workout-blurb">
    <div class="workout-img">
      <i :class="getWorkoutIconClass(workout.type)"></i>
    </div>
    <div class="workout-info">
      <div class="workout-header">
        <h3 class="workout-title">{{ workout.name }}</h3>
        <div class="workout-actions">
          <button class="action-button" @click="emit('edit-workout', workout)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-button delete-button" @click="emit('delete-workout', workout)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <p class="workout-description">{{ workout.comment }}</p>
      <ul class="workout-details">
        <li>Type: {{ workout.type }}</li>
        <li>Date: {{ formatDate(workout.workoutdate) }}</li>
        <li>Duration: {{ workout.duration }} minutes</li>
        <li v-if="workout.type === 'Cardio'">Distance: {{ workout.distance ? workout.distance.toFixed(2) : '0' }} km</li>
        <li>Calories Burned: {{ workout.calories }} kcal</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
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

.workout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.workout-actions {
  display: flex;
  gap: 8px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #2a5934;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: rgba(42, 89, 52, 0.1);
}

.delete-button {
  color: #dc3545;
}

.delete-button:hover {
  background-color: rgba(220, 53, 69, 0.1);
}
</style>
