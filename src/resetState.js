import store from './index.js'


export function resetState(id) {
  fetch(`http://localhost:3000/api/v1/users/${id}`)
  .then(resp => resp.json())
  .then(user => {
    store.dispatch({type: "SET_EVENTS", payload: user.events})
    store.dispatch({type: "SET_PEOPLE", payload: user.people})
    store.dispatch({type: "SET_GIFTS", payload: user.gifts})

  })
}

export default resetState
