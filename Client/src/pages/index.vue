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
}

h1 {
  color: #2a5934; 
  text-align: center;
  font-size: 28px;
  font-weight: 700;
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
  margin: auto !important;
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
