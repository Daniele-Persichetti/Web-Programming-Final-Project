<script setup lang="ts"></script>

<!-- Login Form -->
<template>
  <main>
    <div id="login-container" class="login-container">
      <h1 class="login-title">Welcome Back!</h1>
      <p class="login-subtext">Please enter your credentials to access your account.</p>
      <form id="login-form" class="login-form" action="#" method="POST">
        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-input"
          placeholder="Enter your email"
          required
        />
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form-input"
          placeholder="Enter your password"
          required
        />
        <button type="submit" class="login-button">Log In</button>
      </form>
      <p class="register-link">Don't have an account? <a href="register.html">Sign Up</a></p>
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
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1,
p {
  color: #2a5934;
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

/* Login Container */
.login-container {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0px;
}

.login-title {
  font-size: 2em;
  margin-bottom: 10px;
}

.login-subtext {
  font-size: 1em;
  margin-bottom: 20px;
  color: #555;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-top: 10px;
  color: #555;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 1em;
}

.register-link {
  margin-top: 20px;
  font-size: 0.9em;
  color: #555;
}

.register-link a {
  color: #2a5934;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Responsive Design */
/* Mobile Layout */
@media screen and (max-width: 767px) {
  .login-container {
    width: 90%;
  }
}

/* Tablet Landscape and Desktop Layout */
@media screen and (min-width: 768px) {
  .login-container {
    max-width: 500px;
  }
}
</style>
