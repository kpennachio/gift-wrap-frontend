

let defaultState = {
  test: "something"
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "TEST":
      return { ...state }
    default:
      return state
  }
}

export default reducer
