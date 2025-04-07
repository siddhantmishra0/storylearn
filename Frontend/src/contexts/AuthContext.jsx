"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll just check if email contains "@" and password length
    if (email.includes("@") && password.length >= 6) {
      const user = { email, name: email.split("@")[0] }
      localStorage.setItem("user", JSON.stringify(user))
      setCurrentUser(user)
      return true
    }
    return false
  }

  // Register function
  const register = (email, password, name) => {
    // In a real app, you would send this data to your backend
    // For demo purposes, we'll just check if email contains "@" and password length
    if (email.includes("@") && password.length >= 6) {
      const user = { email, name: name || email.split("@")[0] }
      localStorage.setItem("user", JSON.stringify(user))
      setCurrentUser(user)
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

