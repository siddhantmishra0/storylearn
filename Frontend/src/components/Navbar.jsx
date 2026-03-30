import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, Menu, X, LogOut, User } from "lucide-react"

export default function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">StoryLearn</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Home
            </Link>

            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/history" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
                  History
                </Link>
                <div className="flex items-center ml-4">
                  <span className="text-gray-700 mr-2">{currentUser.name}</span>
                  <button onClick={handleLogout} className="flex items-center text-gray-700 hover:text-purple-600">
                    <LogOut className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center px-3 py-2">
                    <User className="h-5 w-5 text-gray-700 mr-2" />
                    <span className="text-gray-700">{currentUser.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-purple-600 px-3 py-2 w-full text-left"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

