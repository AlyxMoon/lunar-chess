import { canPieceMoveToTile } from '@/app/game/vuex/actions'

describe('Movement Rules', () => {
  let board = Array(64).fill(null)

  beforeEach(() => {
    board = Array(64).fill(null)
  })

  describe('general movement', () => {
    it('pieces cannot move onto themselves', () => {
      for (let i = 0, end = 6; i < end; i++) {
        board[i] = i
      }

      let pieces = [
        {
          type: 'pawn',
          tile: 0
        },
        {
          type: 'rook',
          tile: 1
        },
        {
          type: 'knight',
          tile: 2
        },
        {
          type: 'bishop',
          tile: 3
        },
        {
          type: 'queen',
          tile: 4
        },
        {
          type: 'king',
          tile: 5
        }
      ]

      // pawn
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 0)).toBe(false)
      // rook
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 1)).toBe(false)
      // knight
      expect(canPieceMoveToTile(board, pieces, [], pieces[2], 2)).toBe(false)
      // bishop
      expect(canPieceMoveToTile(board, pieces, [], pieces[3], 3)).toBe(false)
      // queen
      expect(canPieceMoveToTile(board, pieces, [], pieces[4], 4)).toBe(false)
      // king
      expect(canPieceMoveToTile(board, pieces, [], pieces[5], 5)).toBe(false)
    })
    it('pieces cannot move onto an allied piece', () => {
      expect(true).toBe(false)
    })
    it('pieces cannot move off of the board', () => {
      expect(true).toBe(false)
    })
  })

  describe('pawn movement', () => {
    it('pawns are not allowed to move backwards or sideways', () => {
      board[19] = 0
      board[43] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 19
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 43
        }
      ]

      // white pawn
      for (let i = 0, end = 24; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], i)).toBe(false)
      }
      // black pawn
      for (let i = 42, end = 64; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[1], i)).toBe(false)
      }
    })
    it('pawns are not allowed to move outside their move radius', () => {
      board[35] = 0
      board[28] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 35,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 28,
          moves: 0
        }
      ]

      // white pawn
      for (let i = 40, end = 64; i < end; i++) {
        if ([42, 43, 44, 51].indexOf(i) === -1) {
          expect(canPieceMoveToTile(board, pieces, pieces[0], i)).toBe(false)
        }
      }
      // black pawn
      for (let i = 0, end = 23; i < end; i++) {
        if ([12, 19, 20, 21].indexOf(i) === -1) {
          expect(canPieceMoveToTile(board, pieces, pieces[1], i)).toBe(false)
        }
      }
    })
    it('pawns can make a double move on their first move', () => {
      board[0] = 0
      board[63] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 0,
          moved: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 63,
          moved: 0
        }
      ]

      // white piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 16)).toBe(true)
      // black piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 47)).toBe(true)
    })
    it('pawns cannot make a double move after their first move', () => {
      board[0] = 0
      board[63] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 0,
          moves: 1
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 63,
          moves: 2
        }
      ]

      // white piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 16)).toBe(false)
      // black piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 47)).toBe(false)
    })
    it('pawns can move forward one space', () => {
      board[0] = 0
      board[63] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 0,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 63,
          moves: 0
        }
      ]

      // white piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 8)).toBe(true)
      // black piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 55)).toBe(true)
    })
    it('pawns cannot move forward into an enemy piece', () => {
      board[0] = 0
      board[8] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 0,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 8,
          moves: 0
        }
      ]

      // white piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 8)).toBe(false)
      // black piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 0)).toBe(false)
    })
    it('pawns cannot move forwards past an enemy piece', () => {
      board[8] = 0
      board[16] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 8,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 16,
          moves: 0
        }
      ]

      // white piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 24)).toBe(false)
      // black piece
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 0)).toBe(false)
    })
    it('pawns can only attack one tile diagonally forward', () => {
      board[1] = 0
      board[6] = 1
      board[8] = 2
      board[10] = 3
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 1,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 6,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 8,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 10,
          moves: 0
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 8)).toBe(true)
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 10)).toBe(true)
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 13)).toBe(false)
      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 15)).toBe(false)
    })
    it('pawns can attack en passent only when the enemy pawn has just made a double move in the previous turn', () => {
      board[1] = 0
      board[2] = 1
      let pieces = [
        {
          type: 'pawn',
          color: 'white',
          tile: 1,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 2,
          moves: 1
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 0,
          moves: 2
        }
      ]
      let previousMoves1 = [
        {
          piece: 1,
          previousTile: 18,
          newTile: 2
        }
      ]
      let previousMoves2 = [
        {
          piece: 2,
          previousTile: 8,
          newTile: 0
        }
      ]

      expect(canPieceMoveToTile(board, pieces, previousMoves1, pieces[0], 9)).toBe(true)
      expect(canPieceMoveToTile(board, pieces, previousMoves2, pieces[0], 8)).toBe(false)
    })
  })
})
