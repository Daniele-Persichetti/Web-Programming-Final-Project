<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import type { User } from '@/models/users'
import NavBar from './components/NavBar.vue'

const selectedUser = ref<User | null>(null)
</script>

<template>
  <header>
    <NavBar @user-selected="selectedUser = $event" />
    <RouterView :user="selectedUser" />
  </header>
</template>

<style scoped>
body {
  background-color: rgb(69, 161, 242);
}

.container {
  background-color: white;
  box-shadow: drop-shadow(0 0 10px rgba(0, 0, 0, 0.8));
}
</style>
