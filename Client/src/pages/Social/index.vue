<script setup lang="ts"></script>

<template>
  <main>
    <div id="social-content" class="content">
      <h1>Social</h1>
      <!-- Two Columns Layout -->
      <div class="two-columns">
        <!-- Left Column: Friends Activity -->
        <div class="left-column">
          <h2 class="section-title">Friends Activity</h2>
          <!-- Friend Activity Blurb 1 -->
          <div class="friend-activity-blurb">
            <img src="placeholder-profile1.jpg" alt="Jane Smith" class="friend-img" />
            <div class="friend-info">
              <h3 class="friend-name">Jane Smith</h3>
              <p class="friend-workout">Cardio - 5 km run</p>
              <ul class="workout-details">
                <li>Duration: 30 minutes</li>
                <li>Calories Burned: 300 kcal</li>
              </ul>
            </div>
          </div>
          <!-- Friend Activity Blurb 2 -->
          <div class="friend-activity-blurb">
            <img src="placeholder-profile2.jpg" alt="Mike Johnson" class="friend-img" />
            <div class="friend-info">
              <h3 class="friend-name">Mike Johnson</h3>
              <p class="friend-workout">Strength - Upper Body Workout</p>
              <ul class="workout-details">
                <li>Duration: 45 minutes</li>
                <li>Calories Burned: 400 kcal</li>
              </ul>
            </div>
          </div>
          <!-- Friend Activity Blurb 3 -->
          <div class="friend-activity-blurb">
            <img src="placeholder-profile3.jpg" alt="Susan Lee" class="friend-img" />
            <div class="friend-info">
              <h3 class="friend-name">Susan Lee</h3>
              <p class="friend-workout">Flexibility - Yoga Session</p>
              <ul class="workout-details">
                <li>Duration: 20 minutes</li>
                <li>Calories Burned: 100 kcal</li>
              </ul>
            </div>
          </div>
          <!-- Friend Activity Blurb 4 -->
          <div class="friend-activity-blurb">
            <img src="placeholder-profile4.jpg" alt="Chris Brown" class="friend-img" />
            <div class="friend-info">
              <h3 class="friend-name">Chris Brown</h3>
              <p class="friend-workout">Balance - Pilates Session</p>
              <ul class="workout-details">
                <li>Duration: 40 minutes</li>
                <li>Calories Burned: 250 kcal</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Right Column: Search Friends -->
        <div class="right-column">
          <h2 class="section-title">Search Friends</h2>
          <!-- Search Bar -->
          <form id="search-friends-form" class="form" action="#">
            <label for="friend-search" class="form-label">Find Friend:</label>
            <input
              type="text"
              id="friend-search"
              name="friend-search"
              class="form-input"
              placeholder="Enter username"
            />
            <button type="submit" class="form-button">Search</button>
          </form>
          <!-- Recent Searches -->
          <h3 class="recent-search-title">Recent Searches</h3>
          <!-- Recent Search Blurb 1 -->
          <div class="recent-search-blurb">
            <img src="placeholder-profile5.jpg" alt="Alex Green" class="search-img" />
            <div class="search-info">
              <h3 class="search-name">Alex Green</h3>
              <!-- Icons for actions -->
              <div class="action-icons">
                <a href="#" class="add-friend-icon" title="Send Friend Request">
                  <i class="fas fa-user-plus"></i>
                </a>
                <a href="#" class="view-profile-icon" title="View Profile">
                  <i class="fas fa-user-circle"></i>
                </a>
              </div>
            </div>
          </div>
          <!-- Recent Search Blurb 2 -->
          <div class="recent-search-blurb">
            <img src="placeholder-profile6.jpg" alt="Emma Stone" class="search-img" />
            <div class="search-info">
              <h3 class="search-name">Emma Stone</h3>
              <!-- Icons for actions -->
              <div class="action-icons">
                <a href="#" class="add-friend-icon" title="Send Friend Request">
                  <i class="fas fa-user-plus"></i>
                </a>
                <a href="#" class="view-profile-icon" title="View Profile">
                  <i class="fas fa-user-circle"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Font Awesome Integration */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* Base Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

h2,
h3 {
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

/* Social Content */
#social-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Two Columns Layout */
.two-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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

/* Friend Activity Blurbs */
.friend-activity-blurb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
}

.friend-img {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 50%;
}

.friend-info {
  flex-grow: 1;
}

.friend-name {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #2a5934;
}

.friend-workout,
.workout-details li {
  color: #555;
}

/* Recent Search Blurbs */
.recent-search-blurb {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e8f5e9;
}

.search-img {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: 50%;
}

.search-info {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-name {
  font-size: 1.1em;
  color: #2a5934;
}

/* Action Icons */
.action-icons {
  display: flex;
  gap: 10px;
}

.action-icons a {
  color: #2a5934;
  font-size: 1.5em;
  transition: color 0.3s;
}

.action-icons a:hover {
  color: #1e4727;
}

/* Search Friends Form */
.form {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-top: 10px;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-button {
  background-color: #2a5934;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #1e4727;
}

/* Responsive Design */
/* Mobile Layout */
@media screen and (max-width: 767px) {
  #social-content {
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

  .friend-activity-blurb,
  .recent-search-blurb {
    flex-direction: column;
    align-items: flex-start;
  }

  .friend-img,
  .search-img {
    margin-bottom: 10px;
  }

  .search-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-icons {
    margin-top: 10px;
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
  #social-content {
    padding: 20px;
  }

  .two-columns {
    gap: 30px;
  }
}
</style>
