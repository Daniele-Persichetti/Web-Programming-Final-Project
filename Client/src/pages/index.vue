<script setup lang="ts"></script>

<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ultimate Fitness Tracker</title>
  </head>
  <main>
    <!-- Welcome Title -->
    <h1 class="welcome-title">Welcome to Ultimate Fitness Tracker!</h1>
    <p class="welcome-subtext">
      Start your fitness journey, set your goals, and connect with friends.
    </p>
    <!-- Three-Column Section -->
    <div id="welcome-sections" class="three-columns">
      <!-- First Column: Profile Setup -->
      <div class="column">
        <h2 class="column-title">[WIP] Set Up Your Profile</h2>
        <p class="column-description">
          Personalize your account to get started with tracking your progress.
        </p>
        <button class="cta-button">Set Up Your Profile</button>
      </div>
      <!-- Second Column: Add First Workout -->
      <div class="column">
        <h2 class="column-title">[WIP] Add Your First Workout</h2>
        <p class="column-description">
          Begin tracking your exercises and watch your progress grow over time.
        </p>
        <button class="cta-button">Start to Track Your Progress</button>
      </div>
      <!-- Third Column: Invite Friends -->
      <div class="column">
        <h2 class="column-title">[WIP] Invite Your Friends</h2>
        <p class="column-description">
          Bring your friends along for the journey and stay motivated together.
        </p>
        <button class="cta-button">Invite Your Friends</button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h1,
h2 {
  color: #2a5934;
  margin-bottom: 10px;
}

p {
  color: #555;
  margin-bottom: 20px;
  text-align: center;
}

button {
  background-color: #2a5934;
  color: white;
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1e4727;
}

/* Welcome Title */
.welcome-title {
  font-size: 2em;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
}

.welcome-subtext {
  font-size: 1.2em;
  margin-bottom: 30px;
  text-align: center;
}

/* Three-Column Section */
#welcome-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  box-sizing: border-box;
}

.column {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  flex: 1 1 calc(33.33% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.column-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.column-description {
  font-size: 1em;
  margin-bottom: 20px;
}

/* Responsive Design */
/* Mobile Layout */
@media screen and (max-width: 767px) {
  #welcome-sections {
    flex-direction: column;
    align-items: center;
  }

  .column {
    flex: 1 1 100%;
    margin-bottom: 20px;
  }
}

/* Tablet Landscape and Desktop Layout */
@media screen and (min-width: 768px) {
  #welcome-sections {
    flex-wrap: wrap;
    gap: 20px;
  }

  .column {
    flex: 1 1 calc(50% - 20px);
  }
}

@media screen and (min-width: 1200px) {
  #welcome-sections {
    gap: 30px;
  }

  .column {
    flex: 1 1 calc(33.33% - 20px);
  }
}
</style>
