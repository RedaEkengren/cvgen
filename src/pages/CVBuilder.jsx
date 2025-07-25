import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Save, Eye, Github } from 'lucide-react'
import { useCV } from '../context/CVContext'
import { Link } from 'react-router-dom'

export default function CVBuilder() {
  const { state, dispatch } = useCV()
  const [activeSection, setActiveSection] = useState('personal')
  const [githubUsername, setGithubUsername] = useState('')
  const [loadingGithub, setLoadingGithub] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: state.personalInfo
  })

  const sections = [
    { id: 'personal', name: 'Personlig info', icon: '👤' },
    { id: 'education', name: 'Utbildning', icon: '🎓' },
    { id: 'experience', name: 'Erfarenhet', icon: '💼' },
    { id: 'projects', name: 'Projekt', icon: '🚀' },
    { id: 'skills', name: 'Färdigheter', icon: '⚡' },
    { id: 'github', name: 'GitHub', icon: '🐙' },
  ]

  const onPersonalInfoSubmit = (data) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data })
  }

  const addEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    })
  }

  const addExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    })
  }

  const addProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        name: '',
        description: '',
        technologies: '',
        link: '',
        github: ''
      }
    })
  }

  const fetchGithubProjects = async () => {
    if (!githubUsername.trim()) return
    
    setLoadingGithub(true)
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`)
      if (response.ok) {
        const repos = await response.json()
        const projects = repos.map(repo => ({
          name: repo.name,
          description: repo.description || 'Ingen beskrivning tillgänglig',
          technologies: repo.language || 'N/A',
          link: repo.html_url,
          github: repo.html_url,
          stars: repo.stargazers_count
        }))
        dispatch({ type: 'SET_GITHUB_PROJECTS', payload: projects })
      }
    } catch (error) {
      console.error('Error fetching GitHub projects:', error)
    } finally {
      setLoadingGithub(false)
    }
  }

  const renderPersonalInfo = () => (
    <form onSubmit={handleSubmit(onPersonalInfoSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Förnamn</label>
          <input
            {...register('firstName', { required: 'Förnamn krävs' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Ditt förnamn"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Efternamn</label>
          <input
            {...register('lastName', { required: 'Efternamn krävs' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Ditt efternamn"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">E-post</label>
          <input
            {...register('email', { 
              required: 'E-post krävs',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Ogiltig e-postadress'
              }
            })}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="din@email.se"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
          <input
            {...register('phone')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="070-123 45 67"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stad</label>
          <input
            {...register('city')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Stockholm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input
            {...register('linkedIn')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="linkedin.com/in/dittnamn"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
          <input
            {...register('github')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="github.com/dittnamn"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hemsida</label>
          <input
            {...register('website')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://dinhemsida.se"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sammanfattning</label>
        <textarea
          {...register('summary')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Beskriv dig själv kort och koncist. Vad gör dig unik som IT-student?"
        />
      </div>

      <button
        type="submit"
        className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        <Save className="h-4 w-4 mr-2" />
        Spara personlig info
      </button>
    </form>
  )

  const renderGithubSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Ditt GitHub-användarnamn"
        />
        <button
          onClick={fetchGithubProjects}
          disabled={loadingGithub}
          className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Github className="h-4 w-4 mr-2" />
          {loadingGithub ? 'Hämtar...' : 'Hämta projekt'}
        </button>
      </div>

      {state.githubProjects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Dina senaste GitHub-projekt:</h3>
          {state.githubProjects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Språk: {project.technologies}</span>
                    <span>⭐ {project.stars}</span>
                  </div>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Visa på GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo()
      case 'github':
        return renderGithubSection()
      case 'education':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Utbildning</h3>
              <button
                onClick={addEducation}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Lägg till
              </button>
            </div>
            {state.education.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Ingen utbildning tillagd än. Klicka på "Lägg till" för att börja.</p>
            ) : (
              state.education.map((edu, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-medium text-gray-900">Utbildning {index + 1}</h4>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_EDUCATION', index })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {/* Education form fields would go here */}
                </div>
              ))
            )}
          </div>
        )
      default:
        return <div>Sektion under utveckling...</div>
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">CV-sektioner</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg mr-3">{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/preview"
                className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                Förhandsgranska CV
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {sections.find(s => s.id === activeSection)?.name}
              </h1>
              <p className="text-gray-600 mt-2">
                Fyll i din information nedan. Dina ändringar sparas automatiskt.
              </p>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}