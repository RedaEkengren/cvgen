import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, User, Eye, Crown } from 'lucide-react'
import { useCV } from '../context/CVContext'
import PremiumModal from './PremiumModal'

export default function Header() {
  const location = useLocation()
  const { state } = useCV()
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">CV Generator</span>
              <span className="text-sm text-gray-500 hidden sm:inline">för IT-studenter</span>
            </Link>

            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Hem</span>
              </Link>

              <Link
                to="/builder"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/builder') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Skapa CV</span>
              </Link>

              <Link
                to="/preview"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/preview') 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>Förhandsgranska</span>
              </Link>

              {state.isPremium ? (
                <div className="flex items-center space-x-1 px-3 py-2 bg-yellow-50 text-yellow-700 rounded-md text-sm font-medium">
                  <Crown className="h-4 w-4" />
                  <span>Premium</span>
                </div>
              ) : (
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="flex items-center space-x-1 px-3 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors"
                >
                  <Crown className="h-4 w-4" />
                  <span>Få Premium</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)} 
      />
    </>
  )
}