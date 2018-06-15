export default {
  SET_ACTIVE (state, payload) {
    state.activeTile = payload.tile
    state.activePiece = state.pieces[state.board[payload.tile]]
  },
  UNSET_ACTIVE (state) {
    state.activeTile = null
    state.activePiece = null
  },
  MOVE_PIECE (state, payload) {
    state.board[state.activeTile] = null
    state.board[payload.tile] = payload.index
    state.pieces[payload.index].tile = payload.tile
  },

  KILL_PIECE (state, payload) {
    state.board[state.pieces[payload.index].tile] = null
    state.pieces[payload.index].alive = false
  },

  SWITCH_TURN (state) {
    switch (state.currentPlayer) {
      case 'white':
        state.currentPlayer = 'black'
        break
      case 'black':
        state.currentPlayer = 'white'
        break
      default:
        state.currentPlayer = 'red'
        break
    }
  }
}
