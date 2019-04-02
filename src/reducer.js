

let defaultState = {
  test: "something",
  users: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "TEST":
      return { ...state }
    case "GET_USERS":
      return { ...state, users: action.payload}
    default:
      return state
  }
}

export default reducer
