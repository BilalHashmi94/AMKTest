import { VISITEDLIST, CLEARLIST } from '../Constants';

const initialState = {
  list: [],
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case VISITEDLIST:
      state = {
        ...state,
        list: action.payload,
      };
      break;
    case CLEARLIST:
      state = {
        ...state,
        list: [],
      };
      break;

    default:
      break;
  }
  return state;
}
