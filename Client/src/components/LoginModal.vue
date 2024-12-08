<script setup lang="ts">
import { ref, inject, type Ref } from 'vue'
import type { User } from '@/models/types'
import { useRouter } from 'vue-router'
import { login } from '@/models/auth'

const currentUser = inject<Ref<User | null>>('currentUser')!
const showLoginModal = inject<Ref<boolean>>('showLoginModal')!
  const showSignupModal = inject<Ref<boolean>>('showSignupModal')!
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

function switchToSignup() {
  showLoginModal.value = false
  showSignupModal.value = true
}

async function handleSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true
  error.value = ''

  try {
    const response = await login(email.value, password.value)
    console.log('Login response in modal:', response);
    
    if (response.error) {
      error.value = response.error
      return
    }

    // Make sure we're setting the entire user object
    currentUser.value = response.data
    localStorage.setItem('userId', response.data.id)
    
    console.log('Setting current user to:', response.data);
    
    email.value = ''
    password.value = ''
    showLoginModal.value = false
    router.push('/dashboard')
  } catch (err) {
    console.error('Error in modal:', err)
    error.value = 'Login failed. Please check your credentials and try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="showLoginModal" class="modal-overlay" @click="showLoginModal = false">
    <div class="login-container" @click.stop>
      
      <p class="login-subtext">Please enter your credentials to access your account.</p>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form id="login-form" class="login-form" @submit="handleSubmit">
        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-input"
          placeholder="Enter your email"
          required
        />
        
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-input"
          placeholder="Enter your password"
          required
        />
        
        <button 
          type="submit" 
          class="login-button"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>
      
      <p class="register-link">
       Don't have an account? <a href="#" @click.prevent="switchToSignup">Sign Up</a>
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

.login-container {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
}

.close-button:hover {
  color: #000;
}

.login-title {
  color: #2a5934;
  font-size: 1.5rem;
  margin: 0;
}

.login-subtext {
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
}

.login-form {
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

.login-button {
  background-color: #2a5934;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.login-button:disabled {
  background-color: #88ac8e;
  cursor: not-allowed;
}

.login-button:not(:disabled):hover {
  background-color: #1e4727;
}

.register-link {
  margin-top: 1rem;
  text-align: center;
  color: #666;
}

.register-link a {
  color: #2a5934;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>