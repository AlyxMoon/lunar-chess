export default {
  SET_USER (state, payload) {
    state.user = payload.user
  },
  UNSET_USER (state) {
    state.user = null
  }
}
