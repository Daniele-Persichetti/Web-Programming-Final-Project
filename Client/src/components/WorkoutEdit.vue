<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Workout } from '@/models/workout'

const props = defineProps<{
  show: boolean
  workout: Workout | null
}>()

const emit = defineEmits<{
  close: []
  save: [workout: Workout]
}>()

const formData = ref<Workout>({
  userId: 0,
  type: 'Cardio',
  name: '',
  date: new Date().toISOString().split('T')[0],
  duration: 0,
  distance: 0,
  calories: 0,
  comment: ''
})

// Watch for changes in workout prop to update form data
watch(
  () => props.workout,
  (newWorkout) => {
    if (newWorkout) {
      formData.value = {
        ...newWorkout
      }
    }
  },
  { immediate: true }
)

function handleSubmit(event: Event) {
  event.preventDefault()
  emit('save', {
    ...formData.value,
    duration: Number(formData.value.duration),
    distance: Number(formData.value.distance),
    calories: Number(formData.value.calories)
  })
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit Workout</h2>
        <button class="close-button" @click="emit('close')">×</button>
      </div>

      <form @submit="handleSubmit" class="edit-form">
        <label for="edit-type" class="form-label">Type of Workout:</label>
        <select id="edit-type" v-model="formData.type" class="form-select" required>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="Balance">Balance</option>
        </select>

        <label for="edit-name" class="form-label">Workout Name:</label>
        <input type="text" id="edit-name" v-model="formData.name" class="form-input" required />

        <label for="edit-date" class="form-label">Date:</label>
        <input type="date" id="edit-date" v-model="formData.date" class="form-input" required />

        <label for="edit-duration" class="form-label">Duration (minutes):</label>
        <input
          type="number"
          id="edit-duration"
          v-model="formData.duration"
          class="form-input"
          required
        />

        <label for="edit-distance" class="form-label">Distance (if applicable, km):</label>
        <input
          type="number"
          id="edit-distance"
          v-model="formData.distance"
          class="form-input"
          step="0.01"
        />

        <label for="edit-calories" class="form-label">Calories Burned:</label>
        <input type="number" id="edit-calories" v-model="formData.calories" class="form-input" />

        <label for="edit-notes" class="form-label">Additional Notes:</label>
        <textarea
          id="edit-notes"
          v-model="formData.comment"
          class="form-textarea"
          rows="4"
        ></textarea>

        <div class="modal-actions">
          <button type="button" class="cancel-button" @click="emit('close')">Cancel</button>
          <button type="submit" class="save-button">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.edit-form {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-top: 10px;
  color: #2a5934;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-button,
.save-button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.cancel-button {
  background-color: #e0e0e0;
}

.save-button {
  background-color: #2a5934;
  color: white;
}

.save-button:hover {
  background-color: #1e4727;
}

/* Make sure modal scrolls on smaller screens */
@media screen and (max-height: 700px) {
  .modal-content {
    margin: 20px;
    max-height: calc(100vh - 40px);
  }
}
</style>
