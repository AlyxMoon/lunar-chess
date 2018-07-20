import fetch from 'isomorphic-unfetch'
import { apiAddress } from '@/consts.js'

export const login = ({ commit }, { username, password }) => {
  console.log(username, password)
  fetch(`${apiAddress}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(user => {
      console.log('login success!', user)
      commit('SET_USER', { user })
    })
    .catch(err => {
      console.error(err.message, err.stack)
    })
}
