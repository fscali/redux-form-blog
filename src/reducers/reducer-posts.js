import { FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST } from "../actions";
import _ from "lodash";

//redux form facilitates us with forms because it prevents us to manually create a bunch of action creators for managing the form
//it saves us time
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      //we receive from the payload a list of posts but we decided to transform it in an object where every key is the id of the
      //corresponding posts
      //see the documentation of lodash for the mapKeys function that does exactly what we need
      return _.mapKeys(action.payload.data, "id");
    //  case CREATE_POST:
    case FETCH_POST:
      const post = action.payload.data;
      //const newState = { ...state };
      //newState[post.id] = post;
      //return newState;

      return { ...state, [action.payload.data.id]: action.payload.data }; //identical to the commented code above
    case DELETE_POST:
      //this updates the local state even before fetching again the list of posts, so that we don't show the deleted post while
      //the list is updating from the server
      return _.omit(state, action.payload);

    default:
      return state;
  }
}
