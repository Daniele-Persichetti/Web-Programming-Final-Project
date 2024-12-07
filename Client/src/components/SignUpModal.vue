<!--

Work In Progress


<script setup lang="ts">

</script>

<template>
  <div v-if="showSignupModal" class="modal-overlay" @click="showSignupModal = false">
    <div class="signup-container" @click.stop>
      
      <p class="signup-subtext">Create your account by filling out the form below.</p>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form id="signup-form" class="signup-form" @submit.prevent="handleSignup">
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
        Already have an account? <a href="#" @click.prevent="$emit('switchToLogin')">Log In</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showSignupModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      error: null,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async handleSignup() {
      this.isLoading = true;
      this.error = null;

      try {
        // Replace with your Supabase signup logic
        const { data, error } = await this.$supabase.auth.signUp({
          email: this.formData.email,
          password: this.formData.password,
        });

        if (error) {
          throw new Error(error.message);
        }

        // Add additional user data to your Supabase `users` table
        const { error: insertError } = await this.$supabase
          .from('users')
          .insert({
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
          });

        if (insertError) {
          throw new Error(insertError.message);
        }

        this.$emit('signupSuccess'); // Emit event to notify successful signup
      } catch (err) {
        this.error = err.message || 'An error occurred during signup.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Reuse styles from your login modal and adjust as necessary */
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
</style> -->
