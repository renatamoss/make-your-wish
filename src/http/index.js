import axios from 'axios'

const http = axios.create({
    baseURL: 'https://api-login-make-your-wish.herokuapp.com/',
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})

export default http