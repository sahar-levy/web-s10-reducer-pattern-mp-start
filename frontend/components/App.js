import React, { useReducer } from 'react' // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes 

// 👇 create your initial state object here
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ]
}

const reducer = (state, action) => {
  // 👇 implement your reducer here using the action types above
  switch (action.type) {
    case CREATE_QUOTE:
      return { 
        ...state,   // returns a shallow copy of the existing state
        quotes: [...state.quotes, action.payload]   // array bc quotes is an array, shallow copy of original quotes array, and a new quotes that comes from action.payload
      }
    case DELETE_QUOTE: // use filter() to filter out the quotes & because it return a new array!!
      return { 
        ...state, 
        quotes: state.quotes.filter(qt => qt.id !== action.payload) //action.payload contains the info needed to compute the next state
      }
    case EDIT_QUOTE_AUTHENTICITY: //use map() because the array should be the same length as the original
      return { 
        ...state, 
        quotes: state.quotes.map(qt => {
          // 2 things can happen: 
              // 1. the quote matches the action.payload, meaning it's the quote of interest,
              // 2. or not.
          if (qt.id !== action.payload) return qt
          return { ...qt, apocryphal: !qt.apocryphal }
        })
      }
    case SET_HIGHLIGHTED_QUOTE:
      return { 
        ...state, 
        // need to override the highlighted quote key
        highlightedQuote: state.highlightedQuote === action.payload ? null : action.payload
      }
    case TOGGLE_VISIBILITY:
      return { 
        ...state, 
        displayAllQuotes: !state.displayAllQuotes
      }
    default:
      return state;
  }
}

export default function App() {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState)

  const createQuote = ({ authorName, quoteText }) => {
    // 👇 use the helper function above to create a new quote
    const newQuote = { id: getNextId(), authorName, quoteText, apocryphal: false }
    // 👇 and dispatch it over to the reducer
    dispatch({ type: CREATE_QUOTE, paylod: newQuote })
  }
  const deleteQuote = id => {
    // 👇 implement
    dispatch({ type: DELETE_QUOTE, payload: id })
  }
  const editQuoteAuthenticity = id => {
    // 👇 implement
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id })
  }
  const setHighlightedQuote = id => {
    // 👇 implement
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id })
  }
  const toggleVisibility = () => {
    // 👇 implement
    dispatch({ type: TOGGLE_VISIBILITY })
  }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={state.quotes}
      // 👇 lots of props are missing! Check the Quotes component
        highlightedQuote={state.highlightedQuote}
        displayAllQuotes={state.displayAllQuotes}
        deleteQuote={deleteQuote}
        editQuoteAuthenticity={editQuoteAuthenticity}
        setHighlightedQuote={setHighlightedQuote}
        toggleVisibility={toggleVisibility}
      />
      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}
