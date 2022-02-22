import axios from 'axios'
import store from '@/store'

const http = axios.create({
    baseURL: 'https://api-login-make-your-wish.herokuapp.com/',
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})



//intereceptadores que checan permissões em cada requisição
//guarda o token usuario logado

http.interceptors.request.use(function (config) {
    const token = store.state.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (erro) {
    return Promise.reject(erro)
})

export default http