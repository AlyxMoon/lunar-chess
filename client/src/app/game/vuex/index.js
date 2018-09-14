import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

let board = []
for (let i = 0, end = 64; i < end; i++) {
  if (i < 16) {
    board.push(i)
  } else if (i > 47) {
    board.push(i - 32)
  } else {
    board.push(null)
  }
}

const state = {
  options: {
    showPossibleMoves: true,
    showTileNumbers: true
  },
  currentPlayer: 'white',
  activeTile: null,
  playerInCheck: '',
  pieces: [
    {
      type: 'rook',
      color: 'white',
      tile: 0,
      alive: true
    },
    {
      type: 'knight',
      color: 'white',
      tile: 1,
      alive: true
    },
    {
      type: 'bishop',
      color: 'white',
      tile: 2,
      alive: true
    },
    {
      type: 'king',
      color: 'white',
      tile: 3,
      alive: true
    },
    {
      type: 'queen',
      color: 'white',
      tile: 4,
      alive: true
    },
    {
      type: 'bishop',
      color: 'white',
      tile: 5,
      alive: true
    },
    {
      type: 'knight',
      color: 'white',
      tile: 6,
      alive: true
    },
    {
      type: 'rook',
      color: 'white',
      tile: 7,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 8,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 9,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 10,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 11,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 12,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 13,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 14,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      tile: 15,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 48,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 49,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 50,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 51,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 52,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 53,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 54,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      tile: 55,
      alive: true
    },
    {
      type: 'rook',
      color: 'black',
      tile: 56,
      alive: true
    },
    {
      type: 'knight',
      color: 'black',
      tile: 57,
      alive: true
    },
    {
      type: 'bishop',
      color: 'black',
      tile: 58,
      alive: true
    },
    {
      type: 'king',
      color: 'black',
      tile: 59,
      alive: true
    },
    {
      type: 'queen',
      color: 'black',
      tile: 60,
      alive: true
    },
    {
      type: 'bishop',
      color: 'black',
      tile: 61,
      alive: true
    },
    {
      type: 'knight',
      color: 'black',
      tile: 62,
      alive: true
    },
    {
      type: 'rook',
      color: 'black',
      tile: 63,
      alive: true
    }
  ],
  history: [],
  board
}

export default {
  state,
  actions,
  getters,
  mutations
}
