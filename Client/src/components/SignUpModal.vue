<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'
import type { User } from '@/models/types'
import { useRouter } from 'vue-router'
import { register } from '@/models/auth'

const currentUser = inject<Ref<User | null>>('currentUser')!
const showSignupModal = inject<Ref<boolean>>('showSignupModal')!
const showLoginModal = inject<Ref<boolean>>('showLoginModal')!
const router = useRouter()

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: ''
})

const error = ref('')
const isLoading = ref(false)

async function handleSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true
  error.value = ''

  try {
    const response = await register({
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password,
      username: formData.value.username
    })
    
    if (response.error) {
      error.value = response.error
      return
    }

    currentUser.value = response.data
    localStorage.setItem('userId', response.data.id)
    resetForm()
    showSignupModal.value = false
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  }
}

function switchToLogin() {
  showSignupModal.value = false
  showLoginModal.value = true
}
</script>

<template>
  <div v-if="showSignupModal" class="modal-overlay" @click="showSignupModal = false">
    <div class="signup-container" @click.stop>
      <p class="signup-subtext">Create your account by filling out the form below.</p>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form id="signup-form" class="signup-form" @submit="handleSubmit">
        <label for="firstName" class="form-label">First Name:</label>
        <input
          type="text"
          id="firstName"
          v-model="formData.firstName"
          class="form-input"
          placeholder="Enter your first name"
          required
        />

        <label for="lastName" class="form-label">Last Name:</label>
        <input
          type="text"
          id="lastName"
          v-model="formData.lastName"
          class="form-input"
          placeholder="Enter your last name"
          required
        />

        <label for="username" class="form-label">Username:</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          class="form-input"
          placeholder="Choose a username"
          required
        />

        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="form-input"
          placeholder="Enter your email"
          required
        />
        
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          class="form-input"
          placeholder="Enter your password"
          required
        />
        
        <button 
          type="submit" 
          class="signup-button"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Signing up...' : 'Sign Up' }}
        </button>
      </form>
      
      <p class="login-link">
        Already have an account? <a href="#" @click.prevent="switchToLogin">Log In</a>
      </p>
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
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.signup-container {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.signup-subtext {
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-label {
  color: #2a5934;
  font-weight: bold;
}

.form-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  text-align: center;
}

.signup-button {
  background-color: #2a5934;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.signup-button:disabled {
  background-color: #88ac8e;
  cursor: not-allowed;
}

.signup-button:not(:disabled):hover {
  background-color: #1e4727;
}

.login-link {
  margin-top: 1rem;
  text-align: center;
  color: #666;
}

.login-link a {
  color: #2a5934;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>