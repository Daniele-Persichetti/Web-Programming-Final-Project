<script setup lang="ts">
import { ref, provide } from 'vue'
import type { User } from '@/models/users'
import NavBar from '@/components/NavBar.vue'

const currentUser = ref<User | null>(null)
provide('currentUser', currentUser)

// Handle user selection from NavBar
function handleUserSelected(user: User | null) {
  currentUser.value = user
}
</script>

<template>
  <NavBar @user-selected="handleUserSelected" />
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
