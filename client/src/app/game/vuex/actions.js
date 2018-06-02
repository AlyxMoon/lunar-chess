export const setOrMoveActivePiece = ({ commit, state }, position) => {
  if (state.activePiece === null) {
    let pieceIndex = getIndexofPieceOnTile(state, position)
    if (pieceIndex === -1) return
    commit('SET_ACTIVE_PIECE', { activePiece: pieceIndex })
  } else {
    // TODO: Check if move is valid
    if (isTileOccupied(state, position)) return

    commit('MOVE_PIECE', { index: state.activePiece, position })
  }
}

const isTileOccupied = (state, position) => {
  return getIndexofPieceOnTile(state, position) > -1
}

const getIndexofPieceOnTile = (state, position) => {
  for (let i = 0, end = state.pieces.length; i < end; i++) {
    if (state.pieces[i].position === position) {
      return i
    }
  }
  return -1
}
