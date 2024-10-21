<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
const isAdminDropdownOpen = ref(false)

// Dummy authentication state
const isLoggedIn = ref(false)
const userRole = ref('user') // Can be 'user' or 'admin'

const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value
  // Reset role when logging out
  if (!isLoggedIn.value) userRole.value = 'user'
}

const isAdmin = computed(() => userRole.value === 'admin')

// Temporary function to toggle admin role
const toggleAdminRole = () => {
  userRole.value = userRole.value === 'admin' ? 'user' : 'admin'
}
</script>

<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink to="/" class="navbar-item">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
        </RouterLink>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink v-if="isLoggedIn" to="/dashboard" class="navbar-item">Dashboard</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/social" class="navbar-item">Social</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/profile" class="navbar-item">My Profile</RouterLink>
          <RouterLink to="/login" class="navbar-item">[WIP Login Page]</RouterLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a v-if="!isLoggedIn" class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" @click="toggleLogin">
                {{ isLoggedIn ? 'Log out' : 'Log in' }}
              </a>
              <div
                v-if="isLoggedIn && isAdmin"
                class="navbar-item has-dropdown"
                :class="{ 'is-active': isAdminDropdownOpen }"
              >
                <a class="navbar-link" @click="isAdminDropdownOpen = !isAdminDropdownOpen">
                  Admin
                </a>
                <div class="navbar-dropdown">
                  <RouterLink
                    to="/admin/users"
                    class="navbar-item"
                    @click="isAdminDropdownOpen = false"
                  >
                    Users
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Temporary button for demo purposes -->
  <button @click="toggleAdminRole" class="button is-small">
    Toggle Admin Role ({{ isAdmin ? 'Admin' : 'User' }})
  </button>
</template>

<style scoped>
.navbar {
  background-color: #3273dc;
}

.navbar-item,
.navbar-link {
  color: white;
}

.navbar-item:hover,
.navbar-link:hover {
  background-color: #2366d1;
}

.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

/* Styling for the admin dropdown */
.navbar-dropdown {
  background-color: #3273dc;
  border-top: 2px solid #2366d1;
}

.navbar-dropdown .navbar-item {
  color: white;
}

.navbar-dropdown .navbar-item:hover {
  background-color: #2366d1;
}

.navbar-link.is-arrowless {
  color: white;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: white;
}

.navbar-item.has-dropdown {
  padding: 0;
}

.navbar-item.has-dropdown .navbar-link {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
