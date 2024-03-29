import axios from 'axios';

const local = 'http://localhost:5000';


const production = 'https://doctor-appointment-server-oezy.onrender.com'

let api_url = ''
let mode = 'pro'


export let base_url = mode === 'pro' ? "https://appointments-client-dun.vercel.app" : 'http://localhost:3000';


if (mode === 'pro') {
    api_url = production
} else {
    api_url = local
}


const accessToken = localStorage.getItem('user_token');

const api = axios.create({
    baseURL: `${api_url}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
});


export default api;