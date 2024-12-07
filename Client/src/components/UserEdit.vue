<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '@/models/types'
import { update } from '@/models/users'

const props = defineProps<{
  show: boolean
  user: User | null
}>()

const emit = defineEmits<{
  close: []
  save: [user: User]
}>()

interface UserFormData {
  id: string
  firstname: string
  lastname: string
  email: string
  username: string
  role: string | null
  phone: string | null
  age: number | null
  gender: string | null
  address: string | null
  city: string | null
  state: string | null
  country: string | null
  birthdate: string | null
  image: string | null
  ip: string | null
  macaddress: string | null
}

const formData = ref<UserFormData>({
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  role: 'user',
  phone: null,
  age: null,
  gender: null,
  address: null,
  city: null,
  state: null,
  country: null,
  birthdate: null,
  image: null,
  ip: null,
  macaddress: null
})

// Watch for user changes and update form
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formData.value = {
        ...newUser,
        // Ensure birthDate is properly formatted if it exists
        birthdate: newUser.birthdate ? new Date(newUser.birthdate).toISOString().split('T')[0] : null
      }
    }
  },
  { immediate: true }
)

async function handleSubmit(event: Event) {
  event.preventDefault()
  if (!props.user) return

  try {
    // Convert age to number if it's a string
    const userData = {
      ...formData.value,
      age: formData.value.age ? Number(formData.value.age) : null
    }

    const response = await update(props.user.id, userData)
    if (!response.error) {
      emit('save', response.data)
    }
  } catch (error) {
    console.error('Error updating user:', error)
  }
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit User</h2>
        <button class="close-button" @click="emit('close')">×</button>
      </div>

      <form @submit="handleSubmit" class="edit-form">
        <div class="form-group">
          <label for="edit-firstname">First Name:</label>
          <input type="text" id="edit-firstname" v-model="formData.firstname" required />
        </div>

        <div class="form-group">
          <label for="edit-lastname">Last Name:</label>
          <input type="text" id="edit-lastname" v-model="formData.lastname" required />
        </div>

        <div class="form-group">
          <label for="edit-email">Email:</label>
          <input type="email" id="edit-email" v-model="formData.email" required />
        </div>

        <div class="form-group">
          <label for="edit-username">Username:</label>
          <input type="text" id="edit-username" v-model="formData.username" required />
        </div>

        <div class="form-group">
          <label for="edit-role">Role:</label>
          <select id="edit-role" v-model="formData.role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="form-group">
          <label for="edit-phone">Phone:</label>
          <input type="text" id="edit-phone" v-model="formData.phone" />
        </div>

        <div class="form-group">
          <label for="edit-age">Age:</label>
          <input type="number" id="edit-age" v-model="formData.age" />
        </div>

        <div class="form-group">
          <label for="edit-gender">Gender:</label>
          <select id="edit-gender" v-model="formData.gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="edit-birthdate">Birth Date:</label>
          <input type="date" id="edit-birthdate" v-model="formData.birthdate" />
        </div>

        <div class="form-group">
          <label for="edit-address">Address:</label>
          <input type="text" id="edit-address" v-model="formData.address" />
        </div>

        <div class="form-group">
          <label for="edit-city">City:</label>
          <input type="text" id="edit-city" v-model="formData.city" />
        </div>

        <div class="form-group">
          <label for="edit-state">State:</label>
          <input type="text" id="edit-state" v-model="formData.state" />
        </div>

        <div class="form-group">
          <label for="edit-country">Country:</label>
          <input type="text" id="edit-country" v-model="formData.country" />
        </div>

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
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  color: #2a5934;
  font-weight: bold;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
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
