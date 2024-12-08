<script setup lang="ts">
import { ref, inject, type Ref, onMounted } from 'vue'
import { getAll } from '@/models/users'
import { type User } from '@/models/types'
import UserEdit from '@/components/UserEdit.vue'
import { api } from '@/models/myFetch';
import type { DataEnvelope } from '@/models/dataEnvelope';


const currentUser = inject<Ref<User | null>>('currentUser')!

const showAddModal = ref(false)
const showEditModal = ref(false)
const users = ref<User[]>()
const editingUser = ref<User | null>(null)

async function fetchUsers() {
  try {
    const response = await getAll();
    if (response.error) {
      console.error('Error fetching users:', response.error);
      return;
    }
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}


// Form data structure for add user from admin page with less fields
interface UserFormData {
  firstname: string
  lastname: string
  email: string
  username: string
  role: string
  phone: string
  age: number
  gender: string
  address: string
  city: string
  state: string
  country: string
  password: string
}

// Initialize empty form data
const formData = ref<UserFormData>({
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  role: 'user',
  phone: '',
  age: 0,
  gender: 'other',
  address: '',
  city: '',
  state: '',
  country: '',
  password: ''
})

// Function to reset form data
function resetFormData() {
  formData.value = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    role: 'user',
    phone: '',
    age: 0,
    gender: 'other',
      address: '',
      city: '',
      state: '',
      country: '',
    
    password: ''
  }
}

// Function to handle adding a new user
async function handleAddUser() {
  try {
    // Only send the fields that are required for initial user creation
    const payload = {
      email: formData.value.email,
      password: formData.value.password,
      firstname: formData.value.firstname,
      lastname: formData.value.lastname,
      username: formData.value.username,
      role: formData.value.role || 'user'
    };

    console.log('Sending registration payload:', payload);

    const response = await api<DataEnvelope<User>>('auth/register', payload);
    console.log('Registration response:', response);

    if (response.error) {
      alert(response.error);
      return;
    }

    // If successful, update the optional fields separately
    if (response.data?.id) {
      const additionalData = {
        phone: formData.value.phone || null,
        age: formData.value.age || null,
        gender: formData.value.gender || 'other',
        address: formData.value.address || null,
        city: formData.value.city || null,
        state: formData.value.state || null,
        country: formData.value.country || null,
        image: 'https://dummyjson.com/icon/user/128',
        ip: '0.0.0.0',
        macaddress: '00:00:00:00:00:00'
      };

      // Update the user with additional data
      const updateResponse = await api<DataEnvelope<User>>(
        `users/${response.data.id}`, 
        additionalData, 
        'PATCH'
      );

      if (updateResponse.error) {
        console.error('Error updating additional user data:', updateResponse.error);
      }
    }

    await fetchUsers();
    showAddModal.value = false;
    resetFormData();
  } catch (error) {
    console.error('Error adding user:', error);
    alert('Failed to add user');
  }
}

// Function to handle editing a user
function handleEditUser(user: User) {
  editingUser.value = user
  showEditModal.value = true
}


async function handleSaveEdit(updatedUser: User) {
  try {
    const response = await api<DataEnvelope<User>>(`users/${updatedUser.id}`, updatedUser, 'PATCH');
    if (response.error) {
      alert(response.error);
      return;
    }
    await fetchUsers();
    showEditModal.value = false;
    editingUser.value = null;
  } catch (error) {
    console.error('Error updating user:', error);
    alert('Failed to update user');
  }
}

// Function to handle deleting a user
async function handleDeleteUser(user: User) {
  if (user.id === currentUser.value?.id) {
    alert('You cannot delete your own account!')
    return
  }

  if (confirm(`Are you sure you want to delete user ${user.firstname} ${user.lastname}?`)) {
    try {
      console.log(`Attempting to delete user with ID: ${user.id}`)
      const response = await api<DataEnvelope<{ message: string }>>(`auth/delete/${user.id}`, null, 'DELETE')
      
      if (response.error) {
        console.error('Delete response error:', response.error)
        alert(`Error deleting user: ${response.error}`)
        return
      }
      
      console.log('Delete response:', response)
      await fetchUsers() 
    } catch (error: any) {
      console.error('Delete operation error:', error)
      alert(`Failed to delete user: ${error.message || 'Unknown error'}`)
    }
  }
}

onMounted(fetchUsers);

</script>

<template>
  <main class="admin-container">
    <h1 class="admin-title">Admin Panel</h1>

    <!-- Add User Button -->
    <div class="add-user-section">
      <button @click="showAddModal = true" class="add-button">Add New User</button>
    </div>

    <!-- User Table -->
    <table class="user-table">
      <thead>
        <tr>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td><img :src="user.image ?? undefined" :alt="user.firstname" class="user-photo" /></td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button class="edit-button" title="Edit User" @click="handleEditUser(user)">
              &#9998;
            </button>
            <button class="delete-button" title="Delete User" @click="handleDeleteUser(user)">
              &#10060;
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h2>Add New User</h2>
        <form @submit.prevent="handleAddUser" class="user-form">
          <div class="form-group">
            <label>First Name:</label>
            <input v-model="formData.firstname" required />
          </div>
          <div class="form-group">
            <label>Last Name:</label>
            <input v-model="formData.lastname" required />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" v-model="formData.email" required />
          </div>
          <div class="form-group">
            <label>Username:</label>
            <input v-model="formData.username" required />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" v-model="formData.password" required />
          </div>
          <div class="form-group">
            <label>Role:</label>
            <select v-model="formData.role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="form-group">
            <label>Phone:</label>
            <input v-model="formData.phone" />
          </div>
          <div class="form-group">
            <label>Age:</label>
            <input type="number" v-model="formData.age" />
          </div>
          <div class="form-group">
            <label>Gender:</label>
            <select v-model="formData.gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <h3>Address</h3>
          <div class="form-group">
            <label>Street:</label>
            <input v-model="formData.address" />
          </div>
          <div class="form-group">
            <label>City:</label>
            <input v-model="formData.city" />
          </div>
          <div class="form-group">
            <label>State:</label>
            <input v-model="formData.state" />
          </div>
          <div class="form-group">
            <label>Country:</label>
            <input v-model="formData.country" />
          </div>
          <div class="form-actions">
            <button type="button" @click="showAddModal = false" class="cancel-button">
              Cancel
            </button>
            <button type="submit" class="submit-button">Add User</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Using UserEdit component for editing -->
    <UserEdit
      :show="showEditModal"
      :user="editingUser"
      @close="showEditModal = false"
      @save="handleSaveEdit"
    />
  </main>
</template>

<style scoped>
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

h1 {
  color: #2a5934;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
}

p {
  margin-bottom: 20px;
  color: #555;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.user-table th,
.user-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.user-table th {
  background-color: #2a5934;
  color: white;
}

.user-table td {
  color: #555;
}

.user-table tr:hover {
  background-color: #e8f5e9;
}

.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/* Action Buttons */
.edit-button,
.delete-button {
  border: none;
  padding: 8px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 1.2em;
}

.edit-button {
  color: #2a5934;
  background: none;
}

.delete-button {
  color: #d9534f;
  background: none;
}

.edit-button:hover {
  color: #1e4727;
}

.delete-button:hover {
  color: #c9302c;
}

/* Admin panel styles */
.admin-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.add-user-section {
  margin: 20px 0;
}

.add-button {
  background-color: #2a5934;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
}

.add-button:hover {
  background-color: #1e4727;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

/* Form styles */
.user-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
  color: #2a5934;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.submit-button,
.cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  background-color: #2a5934;
  color: white;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}

.submit-button:hover {
  background-color: #1e4727;
}

.cancel-button:hover {
  background-color: #c82333;
}
/* Responsive Design */

/* Mobile Layout */
@media screen and (max-width: 767px) {
  .user-table {
    width: 95%;
    font-size: 0.9em;
  }

  .user-table th,
  .user-table td {
    padding: 10px;
  }

  .user-photo {
    width: 40px;
    height: 40px;
  }
}

/* Tablet Landscape and Desktop Layout */
@media screen and (min-width: 768px) {
  .user-table {
    width: 100%;
    font-size: 1em;
  }
}
</style>
