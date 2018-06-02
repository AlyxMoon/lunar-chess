export default {
  SET_ACTIVE_PIECE (state, payload) {
    state.activePiece = payload.activePiece
  },

  MOVE_PIECE (state, payload) {
    state.pieces[payload.index].position = payload.position
    state.activePiece = null
  }
}
