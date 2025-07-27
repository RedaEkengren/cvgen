import { createContext, useContext, useReducer, useEffect } from 'react'

const CVContext = createContext()

const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    linkedIn: '',
    github: '',
    website: '',
    summary: '',
    photoUrl: ''
  },
  education: [
    {
      id: 1,
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  experience: [
    {
      id: 1,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  projects: [],
  skills: {
    programmingLanguages: [''],
    frameworksLibraries: [''],
    toolsOther: ['']
  },
  githubProjects: [],
  isPremium: false,
  selectedTemplate: 'modern'
}

function cvReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } }
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] }
    case 'UPDATE_EDUCATION':
      return { 
        ...state, 
        education: state.education.map((item, index) => 
          index === action.index ? { ...item, [action.field]: action.value } : item
        )
      }
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((_, index) => index !== action.index) }
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] }
    case 'UPDATE_EXPERIENCE':
      return { 
        ...state, 
        experience: state.experience.map((item, index) => 
          index === action.index ? { ...item, [action.field]: action.value } : item
        )
      }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((_, index) => index !== action.index) }
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] }
    case 'UPDATE_PROJECT':
      return { 
        ...state, 
        projects: state.projects.map((item, index) => 
          index === action.index ? { ...item, [action.field]: action.value } : item
        )
      }
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((_, index) => index !== action.index) }
    case 'ADD_SKILL':
      const { category } = action.payload
      console.log('ADD_SKILL reducer called:', { category, currentSkills: state.skills });
      const newState = { 
        ...state, 
        skills: {
          ...state.skills,
          [category]: [...(state.skills[category] || []), '']
        }
      };
      console.log('ADD_SKILL new state:', newState.skills);
      return newState;
    case 'UPDATE_SKILL':
      return { 
        ...state, 
        skills: {
          ...state.skills,
          [action.payload.category]: state.skills[action.payload.category].map((skill, index) => 
            index === action.payload.index ? action.payload.value : skill
          )
        }
      }
    case 'REMOVE_SKILL':
      return { 
        ...state, 
        skills: {
          ...state.skills,
          [action.payload.category]: state.skills[action.payload.category].filter((_, index) => index !== action.payload.index)
        }
      }
    case 'UPDATE_SKILLS':
      return { ...state, skills: action.payload }
    case 'SET_GITHUB_PROJECTS':
      return { ...state, githubProjects: action.payload }
    case 'SET_PREMIUM':
      return { ...state, isPremium: action.payload }
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload }
    case 'LOAD_STATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(cvReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('cv-generator-data')
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: 'LOAD_STATE', payload: parsedState })
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }

    // Check for premium code
    const premiumCode = localStorage.getItem('cv-generator-premium')
    if (premiumCode === 'PREMIUM_ACTIVATED') {
      dispatch({ type: 'SET_PREMIUM', payload: true })
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cv-generator-data', JSON.stringify(state))
  }, [state])

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const context = useContext(CVContext)
  if (!context) {
    throw new Error('useCV must be used within a CVProvider')
  }
  return context
}