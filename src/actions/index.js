import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';


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