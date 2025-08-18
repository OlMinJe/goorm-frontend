export const initialState = { users: [], loading: false, error: null }

export function fetchUserReducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, loading: true, error: null }
    case "success":
      return {
        users: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      }
    case "error":
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
