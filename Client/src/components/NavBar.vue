<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, inject, type Ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { User } from '@/models/types'
import LoginModal from './LoginModal.vue'
import { logout } from '@/models/auth'



const router = useRouter()
const currentUser = inject<Ref<User | null>>('currentUser')!
const showLoginModal = inject<Ref<boolean>>('showLoginModal')!

const isOpen = ref(false)
const isAdminDropdownOpen = ref(false)
const adminDropdownRef = ref<HTMLElement | null>(null)

const isAdmin = computed(() => currentUser.value?.role === 'admin')


// Handle clicks outside of admin dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (
    adminDropdownRef.value &&
    !adminDropdownRef.value.contains(event.target as Node) &&
    isAdminDropdownOpen.value
  ) {
    isAdminDropdownOpen.value = false
  }
}

const handleLogout = async () => {
  try {
    await logout()
    currentUser.value = null
    localStorage.removeItem('userId')
    await router.push('/')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(() => currentUser.value, (newUser) => {
  console.log('NavBar currentUser update:', {
    id: newUser?.id,
    name: newUser ? `${newUser.firstname} ${newUser.lastname}` : 'none'
  });
}, { immediate: true, deep: true });
</script>

<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="container">
      <!-- Brand/Logo -->
      <div class="navbar-brand">
        <RouterLink v-if="!currentUser" to="/" class="navbar-item">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
        </RouterLink>
        <button
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <!-- Navigation Menu -->
      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink v-if="currentUser" to="/dashboard" class="navbar-item">Dashboard</RouterLink>
          <RouterLink v-if="currentUser" to="/social" class="navbar-item">Social</RouterLink>
          <RouterLink v-if="currentUser" to="/profile" class="navbar-item">My Profile</RouterLink>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <!-- Login/Signup buttons when not logged in -->
              <template v-if="!currentUser">
                <button class="button is-primary mr-2">
                  <strong>Sign Up</strong>
                </button>
                <button class="button is-light" @click="showLoginModal = true">
                  Login
                </button>
              </template>

              <!-- User info when logged in -->
              <div v-else class="is-flex is-align-items-center">
                <span class="mr-2 has-text-white">
                  Welcome, {{ currentUser.firstname }} {{ currentUser.lastname }}
                </span>
                <button class="button is-light" @click="handleLogout">Log out</button>
              </div>

              <!-- Admin section -->
              <div
                v-if="currentUser && isAdmin"
                class="navbar-item has-dropdown ml-2"
                :class="{ 'is-active': isAdminDropdownOpen }"
                ref="adminDropdownRef"
              >
                <button
                  class="button is-warning"
                  @click.stop="isAdminDropdownOpen = !isAdminDropdownOpen"
                >
                  Admin
                </button>
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

  <!-- Login Modal -->
  <LoginModal v-if="showLoginModal" />
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
