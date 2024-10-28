<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getAll, type User } from '@/models/users'

const router = useRouter()
const emit = defineEmits<{
  'user-selected': [user: User | null]
}>()

const isOpen = ref(false)
const isUserDropdownOpen = ref(false)
const isAdminDropdownOpen = ref(false)
const adminDropdownRef = ref<HTMLElement | null>(null)

// Get all users for the dropdown
const users = ref<User[]>(getAll().data)
const userDropdownRef = ref<HTMLElement | null>(null)

const currentUser = ref<User | null>(null)
const isLoggedIn = ref(false)
const isAdmin = computed(() => currentUser.value?.role === 'admin')

const login = async (user: User) => {
  currentUser.value = user
  isLoggedIn.value = true
  isUserDropdownOpen.value = false
  emit('user-selected', user)
  // Navigate to dashboard after login
  await router.push('/dashboard')
}

const logout = async () => {
  currentUser.value = null
  isLoggedIn.value = false
  emit('user-selected', null)
  // Navigate to home page after logout
  await router.push('/')
}

// Handle clicks outside of dropdowns
const handleClickOutside = (event: MouseEvent) => {
  if (
    adminDropdownRef.value &&
    !adminDropdownRef.value.contains(event.target as Node) &&
    isAdminDropdownOpen.value
  ) {
    isAdminDropdownOpen.value = false
  }
  if (
    userDropdownRef.value &&
    !userDropdownRef.value.contains(event.target as Node) &&
    isUserDropdownOpen.value
  ) {
    isUserDropdownOpen.value = false
  }
}

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <RouterLink v-if="!isLoggedIn" to="/" class="navbar-item">
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
        </div>

        <div class="navbar-end">
          <!-- User Management Section -->
          <div class="navbar-item">
            <div class="buttons">
              <!--Sign Up-->
              <div v-if="!isLoggedIn" class="navbar-item">
                <a class="button is-primary mr-2">
                  <strong>Sign Up</strong>
                </a>
              </div>
              <!-- Login Dropdown -->
              <div
                v-if="!isLoggedIn"
                class="navbar-item has-dropdown"
                :class="{ 'is-active': isUserDropdownOpen }"
                ref="userDropdownRef"
              >
                <a class="button is-light" @click="isUserDropdownOpen = !isUserDropdownOpen">
                  Login
                </a>
                <div class="navbar-dropdown">
                  <a v-for="user in users" :key="user.id" class="navbar-item" @click="login(user)">
                    {{ user.firstName }} {{ user.lastName }}
                  </a>
                </div>
              </div>

              <!-- Logged in user info -->
              <div v-else class="is-flex is-align-items-center">
                <span class="mr-2 has-text-white">
                  Welcome, {{ currentUser?.firstName }} {{ currentUser?.lastName }}
                </span>
                <a class="button is-light" @click="logout"> Log out </a>
              </div>

              <!-- Admin Dropdown -->
              <div
                v-if="isLoggedIn && isAdmin"
                class="navbar-item has-dropdown ml-2"
                :class="{ 'is-active': isAdminDropdownOpen }"
                ref="adminDropdownRef"
              >
                <a
                  class="button is-warning"
                  @click.stop="isAdminDropdownOpen = !isAdminDropdownOpen"
                >
                  Admin
                </a>
                <div class="navbar-dropdown">
                  <RouterLink to="/admin" class="navbar-item" @click="isAdminDropdownOpen = false">
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
</template>

<style scoped>
.navbar {
  background-color: #2a5934;
  max-height: 50px;
}

.nav a.navbar-item,
.navbar-link {
  background-color: #2a5934;
}

.navbar-item,
.navbar-link {
  color: white;
}

.navbar-item:hover,
.navbar-link:hover {
  background-color: #2a5934;
}

.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}

/* Dropdown Styling */
.navbar-dropdown {
  background-color: #ffffff;
  border-top: 2px solid #2a5934;
  border-radius: 2%;
  margin-top: 3px;
}

.navbar-dropdown .navbar-item {
  cursor: pointer;
}

.navbar-dropdown .navbar-item:hover {
  background-color: #2a5934;
  color: white;
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

/* Additional Styling */
.buttons {
  margin-bottom: 0;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

/*Disable Bulma default style*/

/*Change Bulma default menu hover*/
a.navbar-item,
.navbar-link {
  background-color: #2a5934;
  cursor: pointer;
}

/*Change menu width*/
@media screen and (min-width: 1408px) {
  .container:not(.is-max-tablet):not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1200px;
  }
}

/*Change mobile menu background*/
@media screen and (max-width: 1023px) {
  .navbar-menu {
    background-color: #2a5934;
  }
}
</style>
