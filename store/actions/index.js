export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const CREATE_CARD = 'CREATE_CARD'

export const createDeck = (id, name) => ({
    type: CREATE_DECK,
    id,
    name
});

export const createCard = (deckId, question, answer) => ({
    type: CREATE_CARD,
    deckId,
    question,
    answer
});

export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
});
