"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { BookOpen, Brain, Sparkles } from "lucide-react"

export default function Home() {
  const { currentUser } = useAuth()

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Learn Through <span className="text-purple-600">Engaging Stories</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          StoryLearn transforms any topic into interactive, age-appropriate content that makes learning fun and
          memorable.
        </p>
        {currentUser ? (
          <Link
            to="/dashboard"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/register"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Get Started for Free
          </Link>
        )}
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How StoryLearn Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Any Topic</h3>
            <p className="text-gray-600">
              Enter any subject you want to learn about, from science to history to literature.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customize Your Story</h3>
            <p className="text-gray-600">Select age range and story type to get perfectly tailored learning content.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Learn Effectively</h3>
            <p className="text-gray-600">
              Engage with interactive content that makes complex topics easy to understand.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning Experience?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of learners who are making education more engaging and effective.
        </p>
        {currentUser ? (
          <Link
            to="/dashboard"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/register"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started for Free
          </Link>
        )}
      </section>
    </div>
  )
}

