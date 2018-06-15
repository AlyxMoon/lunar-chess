import { abs } from '@/util'
import {
  isPieceOnTile,
  doesTileBelongToCurrentPlayer
} from './getters'

export const setOrMoveActivePiece = ({ commit, state }, tile) => {
  if (state.activeTile === undefined || state.activeTile === null) {
    if (canSelectTile(state, tile)) {
      commit('SET_ACTIVE', { tile })
    }
  } else if (state.activeTile === tile) {
    commit('UNSET_ACTIVE')
  } else {
    if (canPieceMoveToTile(state.board, state.pieces, [], state.activePiece, tile)) {
      if (isPieceOnTile(state)(tile)) {
        commit('KILL_PIECE', { index: state.board[tile] })
      }

      commit('MOVE_PIECE', { index: state.board[state.activeTile], tile })
      commit('UNSET_ACTIVE')
      commit('SWITCH_TURN')
    }
  }
}

export const canSelectTile = (state, tile) => {
  if (!isPieceOnTile(state)(tile)) return false
  if (!doesTileBelongToCurrentPlayer(state)(tile)) return false

  return true
}

export const canPieceMoveToTile = (board, pieces, previousMoves, activePiece, tile) => {
  let diff = abs(activePiece.tile - tile)
  let dir = activePiece.color === 'white' ? 1 : -1
  let currentRow = ~~(activePiece.tile / 8)
  let nextRow = ~~(tile / 8)
  let diffRow = abs(currentRow - nextRow)
  let currentCol = activePiece.tile % 8
  let nextCol = tile % 8
  let diffCol = abs(currentCol - nextCol)

  // RULE - pieces cannot move off of the board
  if (tile < 0 || tile > 64) return false

  // RULE - pieces cannot move onto themselves
  if (activePiece.tile === tile) return false

  // RULE - pieces can't move into pieces of the same color
  if (board[tile] !== null && board[tile] !== undefined) {
    if (pieces[board[tile]].color === activePiece.color) return false
  }

  if (activePiece.type === 'pawn') {
    // RULE - pawns cannot move backwards or sideways

    if (activePiece.color === 'white') {
      if (nextRow <= currentRow) return false
    }
    if (activePiece.color === 'black') {
      if (nextRow >= currentRow) return false
    }

    // RULE - pawns can only make a valid forward move
    if ([7, 8, 9, 16].indexOf(diff) === -1) return false

    // RULE - pawns can make a double move only on first move
    if (diff === 16 && activePiece.moves > 0) return false

    // RULE - pawns cannot move forwards into an any piece
    if (diff === 8 && board[tile] !== null) return false

    // RULE - pawns cannot move forwards past an enemy piece
    if (diff === 16 && board[activePiece.tile + (8 * dir)] !== null) return false

    // RULE - pawns can only attack one tile diagonally forward
    if ((diff === 7 || diff === 9) && (board[activePiece.tile + (diff * dir)] === null)) return false

    // RULES - pawns can attack en passent only when the enemy pawn has just made a double move in the previous turn
    if (board[activePiece.tile + (diff * dir)] === null && (diff === 7 || diff === 9)) {
      let change = diff === 7 ? -dir : dir
      let enemyPiece = board[activePiece.tile + change]

      if (enemyPiece === null) return false
      if (pieces[enemyPiece].type !== 'pawn') return false
      if (previousMoves.length > 0) {
        let lastMove = previousMoves[previousMoves.length - 1]
        if (enemyPiece !== lastMove.piece) return false
        if (abs(lastMove.previousTile - lastMove.newTile) !== 16) return false
      }
    }
  }

  if (activePiece.type === 'rook') {
    // rook can move forwards, backwards, or sideways
    if (!(currentRow === nextRow || diff % 8 === 0)) return false
    else {
      // rooks cannot move through any piece
      let increment = currentRow === nextRow ? 1 : 8
      if (diff > increment) {
        for (let i = increment, end = diff; i < end; i += increment) {
          if (board[activePiece.tile + (i * dir)] !== null) return false
        }
      }
    }
  }

  if (activePiece.type === 'knight') {
    // RULE - knight can move in an L-shape
    if (!((diffRow === 1 && diffCol === 2) || (diffRow === 2 && diffCol === 1))) return false
  }

  return true
}
