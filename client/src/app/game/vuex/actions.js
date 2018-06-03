import {
  isPieceOnTile,
  doesTileBelongToCurrentPlayer
} from './getters'

export const setOrMoveActivePiece = ({ commit, state }, tile) => {
  if (state.activeTile === undefined || state.activeTile === null) {
    if (canSelectTile(state, tile)) {
      commit('SET_ACTIVE_TILE', { tile })
    }
  } else {
    // TODO: Check if move is valid
    // TODO: EN PASSENT
    if (isPieceOnTile(state)(tile)) {
      if (canKillPiece(state)(tile)) {
        commit('KILL_PIECE', { index: state.board[tile] })
      } else {
        return
      }
    }

    commit('MOVE_PIECE', { index: state.board[state.activeTile], tile })
    commit('SWITCH_TURN')
  }
}

const canSelectTile = (state, tile) => {
  if (!isPieceOnTile(state)(tile)) return false
  if (!doesTileBelongToCurrentPlayer(state)(tile)) return false

  return true
}

const canKillPiece = state => tile => {
  let firstPiece = state.pieces[state.board[state.activeTile]]
  let secondPiece = state.pieces[state.board[tile]]

  return firstPiece.color !== secondPiece.color
}
