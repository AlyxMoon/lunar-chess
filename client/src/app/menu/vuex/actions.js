import fetch from 'isomorphic-unfetch'
import { apiAddress } from '@/consts.js'

export const login = (
  { commit },
  { username, password, callback } = { callback: () => {} }
) => {
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
      callback()
    })
    .catch(err => {
      console.error(err.message, err.stack)
      callback(err)
    })
}

export const logout = (
  { commit },
  { callback } = { callback: () => {} }
) => {
  fetch(`${apiAddress}/logout`)
    .then(() => {
      commit('UNSET_USER')
      callback()
    })
    .catch(err => {
      console.error(err.message, err.stack)
      callback(err)
    })
}
