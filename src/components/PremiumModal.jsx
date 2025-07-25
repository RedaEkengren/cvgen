import { useState } from 'react'
import { X, Crown, Check, AlertCircle } from 'lucide-react'
import { useCV } from '../context/CVContext'
import { activatePremium } from '../utils/storage'

export default function PremiumModal({ isOpen, onClose }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { dispatch } = useCV()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    if (activatePremium(code)) {
      setSuccess(true)
      dispatch({ type: 'SET_PREMIUM', payload: true })
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setCode('')
      }, 2000)
    } else {
      setError('Ogiltig aktiveringskod. Kontrollera koden och försök igen.')
    }
    
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Crown className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Aktivera Premium</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {success ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Premium aktiverat!</h4>
              <p className="text-gray-500">Du har nu tillgång till alla premium-funktioner.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Premium-funktioner:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Extra CV-mallar och designteman
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Avancerade anpassningsalternativ
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Prioriterad support
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Framtida uppdateringar
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="activation-code" className="block text-sm font-medium text-gray-700 mb-2">
                    Aktiveringskod
                  </label>
                  <input
                    id="activation-code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ange din aktiveringskod"
                    required
                  />
                </div>

                {error && (
                  <div className="mb-4 flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !code.trim()}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Aktiverar...' : 'Aktivera'}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Köp en aktiveringskod via Gumroad för att låsa upp premium-funktioner.
                  <br />
                  <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                    Köp Premium →
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}