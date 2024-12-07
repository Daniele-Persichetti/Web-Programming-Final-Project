<script setup lang="ts">
import { inject, type Ref } from 'vue'
import type { User } from '@/models/types'

const currentUser = inject<Ref<User | null>>('currentUser')!
</script>

<template>
  <main>
    <div id="profile-content" class="content">
      <h1>Profile</h1>
      <!-- Two Columns Layout -->
      <div class="two-columns">
        <!-- Left Column: User Info -->
        <div class="left-column">
          <!-- User Info Card -->
          <div class="user-info-card" v-if="currentUser">
            <img :src="currentUser.image ?? undefined" :alt="currentUser.firstname" class="user-avatar" />
            <h2 class="user-name">{{ currentUser.firstname }} {{ currentUser.lastname }}</h2>
            <p class="user-role">
              {{ currentUser.role === 'admin' ? 'Administrator' : 'Fitness Enthusiast' }}
            </p>
            <p class="user-location">
              {{ currentUser.city }}, {{ currentUser.state }},
              {{ currentUser.country }}
            </p>
            <div class="user-actions"></div>
          </div>
          <!-- Favorite Links Card -->
          <div class="user-links-card">
            <h3>Favorite Workouts</h3>
            <ul>
              <li>
                <i class="fas fa-running"></i>
                <strong>Favorite Workout: </strong> &nbsp;HIIT
              </li>
              <li>
                <i class="fas fa-biking"></i>
                <strong>Preferred Activity: </strong> &nbsp;Outdoor Biking
              </li>
              <li>
                <i class="fas fa-dumbbell"></i>
                <strong>Strength Focus: </strong> &nbsp;Upper Body
              </li>
              <li>
                <i class="fas fa-mountain"></i>
                <strong>Favorite Terrain: </strong> &nbsp;Mountain Trails
              </li>
              <li>
                <i class="fas fa-water"></i>
                <strong>Favorite Recovery: </strong> &nbsp;Swimming
              </li>
            </ul>
          </div>
        </div>
        <!-- Right Column: Contact Details & Achievement Wall -->
        <div class="right-column">
          <!-- Contact & Details Card -->
          <div class="contact-details-card" v-if="currentUser">
            <h3>Profile Information</h3>
            <p>
              <strong>Full Name:</strong> {{ currentUser.firstname }} {{ currentUser.lastname }}
            </p>
            <p><strong>Email:</strong> {{ currentUser.email }}</p>
            <p><strong>Phone:</strong> {{ currentUser.phone }}</p>
            <p>
              <strong>Address:</strong> {{ currentUser.address }},
              {{ currentUser.city }}, {{ currentUser.state }}
            </p>
            <p><strong>Date of Birth:</strong> {{ currentUser.birthdate }}</p>
            <p>
              <strong>Gender:</strong>
              {{ currentUser.gender!.charAt(0).toUpperCase() + currentUser.gender!.slice(1) }}
            </p>
          </div>
          <!-- Achievement Wall -->
          <div class="achievement-wall">
            <h3>Achievement Wall</h3>
            <!-- Achievement 1 -->
            <div class="achievement-item">
              <img
                src="https://dummyjson.com/icon/lionelm/128"
                alt="Marathon Master"
                class="achievement-img"
              />
              <div class="achievement-info">
                <h4 class="achievement-title">Marathon Master</h4>
                <p class="achievement-description">Completed a full marathon in under 4 hours.</p>
              </div>
            </div>
            <!-- Achievement 2 -->
            <div class="achievement-item">
              <img
                src="https://dummyjson.com/icon/lionelm/128"
                alt="Strength Beast"
                class="achievement-img"
              />
              <div class="achievement-info">
                <h4 class="achievement-title">Strength Beast</h4>
                <p class="achievement-description">Bench pressed over 100 kg.</p>
              </div>
            </div>
            <!-- Achievement 3 -->
            <div class="achievement-item">
              <img
                src="https://dummyjson.com/icon/lionelm/128"
                alt="Yoga Guru"
                class="achievement-img"
              />
              <div class="achievement-info">
                <h4 class="achievement-title">Yoga Guru</h4>
                <p class="achievement-description">Held a plank for 5 minutes straight.</p>
              </div>
            </div>
            <!-- Achievement 4 -->
            <div class="achievement-item">
              <img
                src="https://dummyjson.com/icon/lionelm/128"
                alt="Trail Blazer"
                class="achievement-img"
              />
              <div class="achievement-info">
                <h4 class="achievement-title">Trail Blazer</h4>
                <p class="achievement-description">Biked over 200 km in a single month.</p>
              </div>
            </div>
            <!-- Achievement 5 -->
            <div class="achievement-item">
              <img
                src="https://dummyjson.com/icon/lionelm/128"
                alt="Swim Champ"
                class="achievement-img"
              />
              <div class="achievement-info">
                <h4 class="achievement-title">Swim Champ</h4>
                <p class="achievement-description">Swam 5 km in open water.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Base Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

h2,
h3,
h4 {
  color: #2a5934;
  margin-bottom: 10px;
}

p {
  color: #555;
}

ul {
  padding: 0;
  list-style-type: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Profile Content */
#profile-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Two Columns Layout */
.two-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}

.left-column,
.right-column {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  flex: 1 1 calc(50% - 20px);
}

/* User Info Card */
.user-info-card {
  text-align: center;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
}

.user-name {
  font-size: 1.5em;
  margin-bottom: 5px;
  color: #2a5934;
}

.user-role,
.user-location {
  color: #555;
}

.user-actions {
  margin-top: 10px;
}

/* Favorite Links Card */
.user-links-card {
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.user-links-card ul li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-links-card i {
  margin-right: 10px;
  color: #2a5934;
  font-size: 1.2em;
}

/* Contact Details Card */
.contact-details-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
}

.contact-details-card p {
  margin-bottom: 8px;
}

/* Achievement Wall */
.achievement-wall {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 20px;
}

.achievement-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 2px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
}

.achievement-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px 10px;
}

.achievement-info {
  flex-grow: 1;
}

.achievement-title {
  font-size: 1.1em;
  margin: 3px 0px;
  color: #2a5934;
}

.achievement-description {
  font-size: 0.9em;
  margin: 3px 0px;
  color: #555;
}

/* Responsive Design */
@media screen and (max-width: 767px) {
  #profile-content {
    padding: 10px;
  }

  .two-columns {
    display: block;
  }

  .left-column,
  .right-column {
    flex: 1 1 100%;
    margin-bottom: 20px;
  }

  .user-info-card {
    text-align: center;
  }

  .achievement-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .achievement-img {
    margin-bottom: 5px;
  }
}

@media screen and (min-width: 768px) {
  .two-columns {
    display: flex;
  }

  .left-column,
  .right-column {
    flex: 1 1 calc(50% - 20px);
  }
}

@media screen and (min-width: 1200px) {
  #profile-content {
    padding: 20px;
  }

  .two-columns {
    gap: 30px;
  }
}
</style>
