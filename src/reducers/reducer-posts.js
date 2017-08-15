import { FETCH_POSTS } from '../actions';
import _ from 'lodash';


//redux form facilitates us with forms because it prevents us to manually create a bunch of action creators for managing the form
//it saves us time
export default function (state = {}, action) {
    switch (action.type){
        case FETCH_POSTS: 
            //we receive from the payload a list of posts but we decided to transform it in an object where every key is the id of the
            //corresponding posts
            //see the documentation of lodash for the mapKeys function that does exactly what we need
            return  _.mapKeys(action.payload.data, 'id');
        default: 
             return state;
    }
}