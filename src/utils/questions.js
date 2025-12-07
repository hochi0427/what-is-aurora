export const QUESTION_STORAGE_KEY = 'introduction-questions'
export const DEFAULT_QUESTIONS = ['Do other planets get auroras?']

const safeWindow = typeof window !== 'undefined' ? window : null

export const loadStoredQuestions = () => {
  if (!safeWindow) {
    return [...DEFAULT_QUESTIONS]
  }
  try {
    const saved = JSON.parse(safeWindow.localStorage.getItem(QUESTION_STORAGE_KEY) ?? '[]')
    if (Array.isArray(saved) && saved.length > 0) {
      return saved
    }
  } catch (error) {
    console.warn('Failed to load stored questions', error)
  }
  return [...DEFAULT_QUESTIONS]
}

export const saveQuestions = (items) => {
  if (!safeWindow) return
  try {
    safeWindow.localStorage.setItem(QUESTION_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.warn('Failed to save questions', error)
  }
}
