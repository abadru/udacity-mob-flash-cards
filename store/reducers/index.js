import {
  CREATE_CARD,
  CREATE_DECK,
  DELETE_DECK,
  RECEIVE_DECKS,
} from "../actions";

const initialState = null;

const decksReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case CREATE_DECK:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          name: action.name,
          cards: [],
        },
      };

    case CREATE_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: [
            ...state[action.deckId].cards,
            { question: action.question, answer: action.answer },
          ],
        },
      };

    case DELETE_DECK:
      const curState = { ...state };

      delete curState[action.id];

      return { ...curState };

    default:
      return state;
  }
};

export default decksReducer;
