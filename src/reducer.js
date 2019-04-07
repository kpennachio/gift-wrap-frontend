

let defaultState = {
  users: [],
  user_id: 1,
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
    case "EDIT_PERSON":
      let person = state.people.find(person => person.id === action.payload.id)
      person = { ...person, name: action.payload.name, notes: action.payload.notes}
      let otherPeople = state.people.filter(person => person.id !== action.payload.id)

      return { ...state, people: [ ...otherPeople, person]}
    case "ADD_NEW_PERSON_GIFT_EVENT":
      let event = state.events.find(event => event.id === action.payload.event_id)
      person = state.people.find(person => person.id === action.payload.person_id)

      event.person_gift_events = [ ...event.person_gift_events, {id: action.payload.id, person: person, gift: null}]
      person.person_gift_events = [ ...person.person_gift_events, {id: action.payload.id, event: event, gift: null}]

      let otherEvents = state.events.filter(event => event.id !== action.payload.event_id)
      otherPeople = state.people.filter(person => person.id !== action.payload.person_id)

      return { ...state, events: [ ...otherEvents, event], people: [ ...otherPeople, person]}
    case "EDIT_PERSON_GIFT_EVENT":
      event = state.events.find(event => event.id === action.payload.event_id)
      otherEvents = state.events.filter(event => event.id !== action.payload.event_id)
      event.person_gift_events = event.person_gift_events.map(p => {
        if (p.id === action.payload.pge.id) {
          p = action.payload.pge
        }
        return p
      })
      return { ...state, events: [ ...otherEvents, event]}
    case "ADD_NEW_PERSON_GIFT_IDEA":
      person = state.people.find(person => person.id === action.payload.person_id)
      person.person_gift_ideas = [ ...person.person_gift_ideas, action.payload.pgi]

      otherPeople = state.people.filter(person => person.id !== action.payload.person_id)

      return { ...state, people: [ ...otherPeople, person]}
    case "DELETE_PERSON_GIFT_IDEA":
      person = state.people.find(person => person.id === action.payload.person_id)
      otherPeople = state.people.filter(person => person.id !== action.payload.person_id)

      let otherPersonGiftIdeas = person.person_gift_ideas.filter(pgi => pgi.id !== action.payload.pgi_id)
      person.person_gift_ideas = otherPersonGiftIdeas

      return { ...state, people: [ ...otherPeople, person]}
    case "ADD_NEW_EVENT_GIFT_IDEA":
      event = state.events.find(event => event.id === action.payload.event_id)
      event.event_gift_ideas = [ ...event.event_gift_ideas, action.payload.egi]
      otherEvents = state.events.filter(event => event.id !== action.payload.event_id)

      return { ...state, events: [ ...otherEvents, event]}
    case "DELETE_EVENT_GIFT_IDEA":
      event = state.events.find(event => event.id === action.payload.event_id)
      otherEvents = state.events.filter(event => event.id !== action.payload.event_id)

      let otherEventGiftIdeas = event.event_gift_ideas.filter(egi => egi.id !== action.payload.egi_id)
      event.event_gift_ideas = otherEventGiftIdeas

      return { ...state, events: [ ...otherEvents, event]}
    case "DELETE_PERSON":
      let newPeople = state.people.filter(person => person.id !== action.payload)
      return { ...state, people: newPeople }
    case "ADD_GIFT":
      return { ...state, gifts: [ ...state.gifts, action.payload ]}
    default:
      return state
  }
}

export default reducer
