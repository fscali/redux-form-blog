import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';


const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

const API_KEY = '?key=fscali12345';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    
    //By the time the action arrives to the reducer, because we use the middleware redux-promise, the payload will contain the actual response
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback){
     const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback()); //callback is handled to the action creator by the component, and is necessary to navigate back to the index
    
    //By the time the action arrives to the reducer, because we use the middleware redux-promise, the payload will contain the actual response
    return {
        type: CREATE_POST,
        payload: request
    };
}