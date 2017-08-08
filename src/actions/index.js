import request from 'superagent';

export const REQUEST_GIFS = 'REQUEST_GIFS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=c4069233621f48ff9f473e737f88b04b';

export function requestGifs(term = null){
    const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);
    return {
        type: REQUEST_GIFS,
        payload: data
    }
}

export function openModal(gif) {
    return {
        type: OPEN_MODAL,
        gif
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}