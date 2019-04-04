

let defaultState = {
  users: [],
  currentUser: {}
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload}
    case "GET_CURRENT_USER":
      return { ...state, currentUser: action.payload}
    case "ADD_NEW_EVENT":
      return { ...state, currentUser: { ...state.currentUser, events: [...state.currentUser.events, action.payload]}}
    default:
      return state
  }
}

export default reducer
