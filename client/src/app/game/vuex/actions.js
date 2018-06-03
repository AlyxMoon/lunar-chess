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
  } else {
    if (canPieceMoveToTile(state.board, state.pieces, [], state.activePiece.type, tile)) {
      if (isPieceOnTile(state)(tile)) {
        commit('KILL_PIECE', { index: state.board[tile] })
      }

      commit('MOVE_PIECE', { index: state.board[state.activeTile], tile })
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
  // RULE 1 - pieces cannot move onto themselves
  if (activePiece.tile === tile) return false

  // RULE 2 - pieces can't move into pieces of the same color

  // RULE - pawns cannot move backwards or sideways
  if (activePiece.type === 'pawn') {
    let currentRow = ~~(activePiece.tile / 8)
    let nextRow = ~~(tile / 8)

    if (activePiece.color === 'white') {
      if (nextRow <= currentRow) return false
    }
    if (activePiece.color === 'black') {
      if (nextRow >= currentRow) return false
    }
  }

  // RULE - pawns can only make a valid forward move
  if (activePiece.type === 'pawn') {
    let diff = abs(activePiece.tile - tile)
    if ([7, 8, 9, 16].indexOf(diff) === -1) return false
  }

  // RULE - pawns can make a double move only on first move
  if (activePiece.type === 'pawn') {
    let diff = abs(activePiece.tile - tile)
    if (diff === 16 && activePiece.moves > 0) return false
  }

  // RULE - pawns cannot move forwards into an enemy piece
  if (activePiece.type === 'pawn') {
    let diff = abs(activePiece.tile - tile)
    if (diff === 8 && board[tile] !== null) return false
  }

  // RULE - pawns cannot move forwards past an enemy piece
  if (activePiece.type === 'pawn') {
    let diff = abs(activePiece.tile - tile)
    let dir = activePiece.color === 'white' ? 1 : -1
    if (diff === 16 && board[activePiece.tile + (8 * dir)] !== null) return false
  }

  // RULE - pawns can only attack one tile diagonally forward
  if (activePiece.type === 'pawn') {
    let diff = abs(activePiece.tile - tile)
    let dir = activePiece.color === 'white' ? 1 : -1
    if ((diff === 7 || diff === 9) && (board[activePiece.tile + (diff * dir)] === null)) return false
  }

  // RULES - pawns can attack en passent only when the enemy pawn has just made a double move in the previous turn
  if (activePiece.type === 'pawn') {
    let diff = abs(activePiece.tile - tile)
    let dir = activePiece.color === 'white' ? 1 : -1

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

  return true
}
