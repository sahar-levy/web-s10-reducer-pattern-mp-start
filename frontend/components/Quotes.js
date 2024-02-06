// ❗ No need to change this component!
import React from 'react'

export default function Quotes({
  quotes,
  // 👇 although you can remove the default parameters of the Quotes component after you're done
  // these are all props that go in the JSX in the Quotes component in App.js
  highlightedQuote = 1,
  displayAllQuotes = true,
  deleteQuote = () => { },
  editQuoteAuthenticity = () => { },
  setHighlightedQuote = () => { },
  toggleVisibility = () => { },
}) {

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => deleteQuote(qt.id)}>DELETE</button>
                  <button onClick={() => setHighlightedQuote(qt.id)}>HIGHLIGHT</button>
                  <button onClick={() => editQuoteAuthenticity(qt.id)}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={toggleVisibility}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
