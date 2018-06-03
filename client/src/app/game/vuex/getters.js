export const getTileClasses = state => tile => {
  let alternate
  if (Math.floor(tile / 8) % 2 === 0) {
    alternate = tile % 2 === 0 ? 'a' : 'b'
  } else {
    alternate = tile % 2 === 1 ? 'a' : 'b'
  }

  return `tile tile-${alternate} ${tile === state.activeTile ? 'active' : ''}`
}

export const getPieceClasses = state => pieceIndex => {
  if (pieceIndex === null || pieceIndex === undefined) return ''
  let piece = state.pieces[pieceIndex]
  return `piece ${piece.color} ${piece.type}`
}

export const isPieceOnTile = state => tile => {
  return !(state.board[tile] === undefined || state.board[tile] === null)
}

export const getTypeOfPieceOnTile = state => tile => {
  if (state.board[tile] === undefined || state.board[tile] === null) {
    return null
  } else {
    return state.pieces[state.board[tile]].type
  }
}

export const getColorOfPieceOnTile = state => tile => {
  if (state.board[tile] === undefined || state.board[tile] === null) {
    return null
  } else {
    return state.pieces[state.board[tile]].color
  }
}

export const doesTileBelongToCurrentPlayer = state => tile => {
  return getColorOfPieceOnTile(state)(tile) === state.currentPlayer
}

export const getKilledPieces = state => tile => {
  return state.pieces.filter(piece => {
    return !piece.alive
  })
}
