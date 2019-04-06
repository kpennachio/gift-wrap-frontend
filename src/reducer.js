

let defaultState = {
  users: [],
  currentUser: {},
  events: [],
  people: [],
  gifts: []
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload }
    case "GET_CURRENT_USER":
      return { ...state, currentUser: action.payload }
    case "SET_EVENTS":
      return { ...state, events: action.payload }
    case "SET_PEOPLE":
      return { ...state, people: action.payload }
    case "SET_GIFTS":
      return { ...state, gifts: action.payload }
    case "ADD_NEW_EVENT":
      return { ...state, events: [ ...state.events, action.payload ]}
    case "ADD_NEW_PERSON_NAME":
      return { ...state, people: [ ...state.people, {id: null, name: action.payload} ] }
    case "REMOVE_NEW_PERSON_NAMES":
      let people = state.people.filter(person => person.id !== null)
      return { ...state, people: people }
    case "ADD_NEW_PERSON":
      return { ...state, people: [ ...state.people, action.payload] }
    case "ADD_NEW_PERSON_GIFT_EVENT":
      let event = state.events.find(event => event.id === action.payload.event_id)
      let person = state.people.find(person => person.id === action.payload.person_id)

      event.person_gift_events = [ ...event.person_gift_events, {person: person}]
      person.person_gift_events = [ ...person.person_gift_events, {event: event}]

      let otherEvents = state.events.filter(event => event.id !== action.payload.event_id)
      let otherPeople = state.people.filter(person => person.id !== action.payload.person_id)

      return { ...state, events: [ ...otherEvents, event], people: [ ...otherPeople, person]}
    case "ADD_NEW_PERSON_GIFT_IDEA":
      person = state.people.find(person => person.id === action.payload.person_id)
      person.gift_ideas = [ ...person.gift_ideas, action.payload.pgi]

      otherPeople = state.people.filter(person => person.id !== action.payload.person_id)

      return { ...state, people: [ ...otherPeople, person]}
    default:
      return state
  }
}

export default reducer
