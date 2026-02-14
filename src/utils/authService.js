// User Authentication and Account Management
const USERS_DB_KEY = 'eflash_users'
const CURRENT_USER_KEY = 'eflash_current_user'

export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      // Attempt backend registration first
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (response.ok) {
        return response.json()
      }
    } catch (error) {
      console.log('Backend auth unavailable, using local storage')
    }

    // Local fallback
    const user = {
      id: `USR-${Date.now()}`,
      ...userData,
      password: btoa(userData.password), // Basic encoding, NOT production safe
      createdAt: new Date().toISOString(),
      verified: false
    }

    const users = authService.getAllUsers()
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already registered')
    }

    users.push(user)
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))

    return { success: true, user: { ...user, password: undefined } }
  },

  // Login user
  login: async (email, password) => {
    try {
      // Attempt backend login first
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        const data = response.json()
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user))
        return data
      }
    } catch (error) {
      console.log('Backend auth unavailable, using local storage')
    }

    // Local fallback
    const users = authService.getAllUsers()
    const user = users.find(u => u.email === email && u.password === btoa(password))

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const userData = { ...user, password: undefined }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData))
    return { success: true, user: userData }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY)
    return { success: true }
  },

  // Get current logged-in user
  getCurrentUser: () => {
    const userJson = localStorage.getItem(CURRENT_USER_KEY)
    return userJson ? JSON.parse(userJson) : null
  },

  // Update user profile
  updateProfile: (userId, profileData) => {
    const users = authService.getAllUsers()
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...profileData, id: userId }
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
      
      // Update current user if it's the logged-in user
      const currentUser = authService.getCurrentUser()
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]))
      }

      return { success: true, user: users[userIndex] }
    }

    return { success: false, error: 'User not found' }
  },

  // Get all users (admin only)
  getAllUsers: () => {
    const usersJson = localStorage.getItem(USERS_DB_KEY)
    return usersJson ? JSON.parse(usersJson) : []
  },

  // Get user by ID
  getUserById: (userId) => {
    const users = authService.getAllUsers()
    const user = users.find(u => u.id === userId)
    if (user) {
      const { password, ...userData } = user
      return userData
    }
    return null
  },

  // Add saved address
  addAddress: (userId, address) => {
    const users = authService.getAllUsers()
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex !== -1) {
      if (!users[userIndex].addresses) {
        users[userIndex].addresses = []
      }
      address.id = `ADDR-${Date.now()}`
      users[userIndex].addresses.push(address)
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
      return address
    }
    return null
  },

  // Get user addresses
  getUserAddresses: (userId) => {
    const user = authService.getUserById(userId)
    return user?.addresses || []
  },

  // Verify email (for production)
  sendVerificationEmail: async (email) => {
    try {
      await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      return { success: true }
    } catch (error) {
      console.error('Verification email error:', error)
      return { success: false, error: error.message }
    }
  }
}

export default authService
