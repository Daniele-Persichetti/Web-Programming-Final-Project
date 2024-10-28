<script setup lang="ts"></script>

<template>
  <main>
    <div id="profile-content" class="content">
      <!-- Two Columns Layout -->
      <div class="two-columns">
        <!-- Left Column: User Info -->
        <div class="left-column">
          <!-- User Info Card -->
          <div class="user-info-card">
            <img src="placeholder-avatar.jpg" alt="User Avatar" class="user-avatar" />
            <h2 class="user-name">John Doe</h2>
            <p class="user-role">Fitness Enthusiast</p>
            <p class="user-location">Bay Area, San Francisco, CA</p>
            <div class="user-actions">
              <button class="follow-button">Follow</button>
              <button class="message-button">Message</button>
            </div>
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
          <div class="contact-details-card">
            <h3>Profile Information</h3>
            <p><strong>Full Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> (239) 816-9029</p>
            <p><strong>Mobile:</strong> (320) 380-4539</p>
            <p><strong>Address:</strong> Bay Area, San Francisco, CA</p>
            <p><strong>Date of Birth:</strong> January 1, 1990</p>
            <p><strong>Gender:</strong> Male</p>
          </div>
          <!-- Achievement Wall -->
          <div class="achievement-wall">
            <h3>Achievement Wall</h3>
            <!-- Achievement 1 -->
            <div class="achievement-item">
              <img
                src="placeholder-achievement1.jpg"
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
                src="placeholder-achievement2.jpg"
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
              <img src="placeholder-achievement3.jpg" alt="Yoga Guru" class="achievement-img" />
              <div class="achievement-info">
                <h4 class="achievement-title">Yoga Guru</h4>
                <p class="achievement-description">Held a plank for 5 minutes straight.</p>
              </div>
            </div>
            <!-- Achievement 4 -->
            <div class="achievement-item">
              <img src="placeholder-achievement4.jpg" alt="Trail Blazer" class="achievement-img" />
              <div class="achievement-info">
                <h4 class="achievement-title">Trail Blazer</h4>
                <p class="achievement-description">Biked over 200 km in a single month.</p>
              </div>
            </div>
            <!-- Achievement 5 -->
            <div class="achievement-item">
              <img src="placeholder-achievement5.jpg" alt="Swim Champ" class="achievement-img" />
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
  /* Elegant green */
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
  /* Light green */
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.user-name {
  font-size: 1.5em;
  margin-bottom: 5px;
  color: #2a5934;
  /* Elegant green */
}

.user-role,
.user-location {
  color: #555;
}

.user-actions {
  margin-top: 10px;
}

.follow-button,
.message-button {
  background-color: #2a5934;
  /* Elegant green */
  color: white;
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.follow-button:hover,
.message-button:hover {
  background-color: #1e4727;
  /* Darker green */
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
  /* Elegant green */
  font-size: 1.2em;
}

/* Contact Details Card */
.contact-details-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
  /* Light green */
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
  margin-bottom: 20px;
  /* Add space between sections */
}

.achievement-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 2px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
  /* Light green */
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
  /* Elegant green */
}

.achievement-description {
  font-size: 0.9em;
  margin: 3px 0px;
  color: #555;
}

/* Responsive Design */
/* Mobile Layout */
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

/* Tablet Landscape and Desktop Layout */
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
