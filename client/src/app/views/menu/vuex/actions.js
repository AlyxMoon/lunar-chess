import fetch from 'isomorphic-unfetch'
import { apiAddress } from '@/consts.js'

export const login = (
  { commit },
  { username, password, callback } = { callback: () => {} }
) => {
  fetch(`${apiAddress}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(res => {
      if (!res.success) throw new Error(res.error)

      commit('SET_USER', { user: res.data })
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
  fetch(`${apiAddress}/auth/logout`)
    .then(() => {
      commit('UNSET_USER')
      callback()
    })
    .catch(err => {
      console.error(err.message, err.stack)
      callback(err)
    })
}
