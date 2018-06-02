export const getTileType = (state, getters) => tile => {
  let alternate
  if (Math.floor((tile - 1) / 8) % 2 === 0) {
    alternate = tile % 2 === 0 ? 'a' : 'b'
  } else {
    alternate = tile % 2 === 1 ? 'a' : 'b'
  }

  return `tile tile-${alternate}`
}

export const isPieceOnTile = (state, getters) => tile => {
  return state.pieces.some(piece => {
    return piece.position === tile
  })
}

export const getTypeofPieceOnTile = (state, getters) => tile => {
  for (let i = 0, end = state.pieces.length; i < end; i++) {
    if (state.pieces[i].position === tile) {
      return state.pieces[i].type
    }
  }
  return 'error'
}

export const getImageOfPieceOnTile = (state, getters) => tile => {
  for (let i = 0, end = state.pieces.length; i < end; i++) {
    if (state.pieces[i].position === tile) {
      return `/static/pieces/${state.pieces[i].color}-${state.pieces[i].type}.png`
    }
  }
  return ''
}
