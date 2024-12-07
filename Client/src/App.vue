<script setup lang="ts">
import { ref, provide, onMounted, watch } from 'vue'
import type { User } from '@/models/types'
import NavBar from '@/components/NavBar.vue'
import LoginModal from '@/components/LoginModal.vue'
import { verifySession } from '@/models/auth'


const currentUser = ref<User | null>(null)
const showLoginModal = ref(false)

// Provide both values
provide('currentUser', currentUser)
provide('showLoginModal', showLoginModal)


// Verify session on app mount
onMounted(async () => {
  try {
    const userId = localStorage.getItem('userId')
    if (userId) {
      const response = await verifySession(userId)
      if (!response.error) {
        currentUser.value = response.data
      }
    }
  } catch (error) {
    console.error('Error verifying session:', error)
  }
})

// Handle authentication state update
onMounted(async () => {
  try {
    const userId = localStorage.getItem('userId')
    if (userId) {
      const response = await verifySession(userId)
      if (!response.error) {
        currentUser.value = response.data
      } else {
        // Clear invalid session
        localStorage.removeItem('userId')
        currentUser.value = null
      }
    }
  } catch (error) {
    console.error('Error verifying session:', error)
    localStorage.removeItem('userId')
    currentUser.value = null
  }
})

watch(currentUser, (newUser) => {
  console.log('Current user changed:', {
    id: newUser?.id,
    name: newUser ? `${newUser.firstname} ${newUser.lastname}` : 'none'
  });
}, { deep: true });


</script>

<template>
  <NavBar />
  <LoginModal v-if="showLoginModal" />
  <RouterView />
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

body {
  background-color: rgb(69, 161, 242);
}

.container {
  background-color: white;
  box-shadow: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8));
}
</style>
