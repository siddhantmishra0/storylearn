"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Clock, BookOpen, ChevronRight, Search } from "lucide-react"

export default function History() {
  const [history, setHistory] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContent, setSelectedContent] = useState(null)

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem("contentHistory") || "[]")
    setHistory(savedHistory)
  }, [])

  const filteredHistory = history.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Learning History</h1>
        <p className="text-gray-600 mt-2">Review and revisit your previously generated content</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {filteredHistory.length === 0 ? (
              <div className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No history found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? "Try a different search term" : "Generate some content to see your history"}
                </p>
                {!searchTerm && (
                  <Link
                    to="/dashboard"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Create Content
                  </Link>
                )}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredHistory.map((item) => (
                  <li
                    key={item.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selectedContent?.id === item.id ? "bg-purple-50" : ""}`}
                    onClick={() => setSelectedContent(item)}
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-purple-600 truncate">{item.title}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.storyType}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">{item.topic}</p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="md:w-2/3">
          {selectedContent ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedContent.title}</h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {selectedContent.topic}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Age: {selectedContent.ageRange}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {selectedContent.storyType}
                  </span>
                </div>

                <div className="prose max-w-none">
                  {selectedContent.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Generated on {new Date(selectedContent.createdAt).toLocaleDateString()}</span>
                  </div>

                  <Link
                    to="/dashboard"
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                  >
                    <span>Create New</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Select an item from your history</h3>
              <p className="mt-2 text-sm text-gray-500">Click on any item from your history to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

