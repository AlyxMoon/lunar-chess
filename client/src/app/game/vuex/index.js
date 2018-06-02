import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  activePiece: null,
  pieces: [
    {
      type: 'rook',
      color: 'white',
      position: 0,
      alive: true
    },
    {
      type: 'knight',
      color: 'white',
      position: 1,
      alive: true
    },
    {
      type: 'bishop',
      color: 'white',
      position: 2,
      alive: true
    },
    {
      type: 'queen',
      color: 'white',
      position: 3,
      alive: true
    },
    {
      type: 'king',
      color: 'white',
      position: 4,
      alive: true
    },
    {
      type: 'bishop',
      color: 'white',
      position: 5,
      alive: true
    },
    {
      type: 'knight',
      color: 'white',
      position: 6,
      alive: true
    },
    {
      type: 'rook',
      color: 'white',
      position: 7,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 8,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 9,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 10,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 11,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 12,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 13,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 14,
      alive: true
    },
    {
      type: 'pawn',
      color: 'white',
      position: 15,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 48,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 49,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 50,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 51,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 52,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 53,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 54,
      alive: true
    },
    {
      type: 'pawn',
      color: 'black',
      position: 55,
      alive: true
    },
    {
      type: 'rook',
      color: 'black',
      position: 56,
      alive: true
    },
    {
      type: 'knight',
      color: 'black',
      position: 57,
      alive: true
    },
    {
      type: 'bishop',
      color: 'black',
      position: 58,
      alive: true
    },
    {
      type: 'queen',
      color: 'black',
      position: 59,
      alive: true
    },
    {
      type: 'king',
      color: 'black',
      position: 60,
      alive: true
    },
    {
      type: 'bishop',
      color: 'black',
      position: 61,
      alive: true
    },
    {
      type: 'knight',
      color: 'black',
      position: 62,
      alive: true
    },
    {
      type: 'rook',
      color: 'black',
      position: 63,
      alive: true
    }
  ]
}

export default {
  state,
  actions,
  getters,
  mutations
}
