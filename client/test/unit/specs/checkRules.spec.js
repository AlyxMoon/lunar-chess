import { isPlayerInCheck } from '@/app/game/vuex/actions'

describe('Check Rules - isPlayerInCheck', () => {
  let board

  beforeEach(() => {
    board = Array(64).fill(null)
  })

  it('returns true if king can be attacked by enemy unit', () => {
    board[35] = 0
    board[59] = 1
    let pieces = [
      {
        type: 'king',
        color: 'white',
        tile: 35
      },
      {
        type: 'rook',
        color: 'black',
        tile: 59
      }
    ]

    expect(isPlayerInCheck('white', board, pieces)).toBe(true)
  })
  it('returns false when king cannot be attacked by an enemy unit', () => {
    board[35] = 0
    board[57] = 1
    let pieces = [
      {
        type: 'king',
        color: 'white',
        tile: 35
      },
      {
        type: 'rook',
        color: 'black',
        tile: 57
      }
    ]

    expect(isPlayerInCheck('white', board, pieces)).toBe(false)
  })
})
