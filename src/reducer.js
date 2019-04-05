

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
    case "ADD_NEW_PERSON_NAME":
      return {...state, currentUser: { ...state.currentUser, people: [...state.currentUser.people, {name: action.payload}]}}
    case "ADD_NEW_PERSON":
      return { ...state, currentUser: { ...state.currentUser, people: [...state.currentUser.people, action.payload]}}
    default:
      return state
  }
}

export default reducer


// Issue: add new person name is adding another object to current users people and when add new person happens there will be duplicate names 
