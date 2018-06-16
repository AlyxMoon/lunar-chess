import { canPieceMoveToTile } from '@/app/game/vuex/actions'

describe('Movement Rules', () => {
  let board

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
      board[0] = 0
      board[1] = 2
      board[8] = 1
      board[9] = 3
      let pieces = [
        {
          type: 'pawn',
          tile: 0,
          color: 'white'
        },
        {
          type: 'pawn',
          tile: 8,
          color: 'white'
        },
        {
          type: 'pawn',
          tile: 1,
          color: 'black'
        },
        {
          type: 'pawn',
          tile: 9,
          color: 'black'
        }
      ]

      expect(canPieceMoveToTile(board, pieces, pieces[0], 8)).toBe(false)
      expect(canPieceMoveToTile(board, pieces, pieces[3], 1)).toBe(false)
    })
    it('pieces cannot move off of the board', () => {
      board[0] = 0
      let pieces = [
        {
          type: 'queen',
          color: 'white',
          tile: 0
        }
      ]

      expect(canPieceMoveToTile(board, pieces, pieces[0], -8)).toBe(false)
      expect(canPieceMoveToTile(board, pieces, pieces[0], 64)).toBe(false)
    })
    it('piece cannot move if it puts the king in check', () => {
      board[35] = 0
      board[34] = 1
      board[33] = 2
      let pieces = [
        {
          type: 'king',
          color: 'white',
          tile: 35
        },
        {
          type: 'rook',
          color: 'white',
          tile: 34
        },
        {
          type: 'rook',
          color: 'black',
          tile: 33
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[1], 42)).toBe(false)
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

  describe('rook movement', () => {
    it('rook can move forwards, backwards, or sideways', () => {
      board[35] = 0
      let pieces = [{
        type: 'rook',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [3, 11, 19, 27, 32, 33, 34, 36, 37, 38, 39, 43, 51, 59]
      for (let i = 0, end = allowedTiles.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], allowedTiles[i])).toBe(true)
      }
    })
    it('rooks cannot move anything that is not forwards, backwards, or sideways', () => {
      board[35] = 0
      let pieces = [{
        type: 'rook',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [3, 11, 19, 27, 32, 33, 34, 36, 37, 38, 39, 43, 51, 59]
      for (let i = 0, end = 64; i < end; i++) {
        if (!allowedTiles.includes(i)) {
          expect(canPieceMoveToTile(board, pieces, [], pieces[0], i)).toBe(false)
        }
      }
    })
    it('rooks cannot move through any piece', () => {
      board[35] = 0
      board[27] = 1
      board[34] = 2
      board[36] = 3
      board[43] = 4
      let pieces = [
        {
          type: 'rook',
          color: 'white',
          tile: 35
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 27
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 34
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 36
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 43
        }
      ]

      let plannedTiles = [3, 11, 19, 32, 33, 37, 38, 39, 51, 59]
      for (let i = 0, end = plannedTiles.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], plannedTiles[i])).toBe(false)
      }
    })
    it('rooks can move into an enemy piece', () => {
      board[0] = 0
      board[1] = 1
      board[8] = 2
      board[9] = 3
      let pieces = [
        {
          type: 'rook',
          tile: 0,
          color: 'white'
        },
        {
          type: 'pawn',
          tile: 1,
          color: 'black'
        },
        {
          type: 'rook',
          tile: 8,
          color: 'black'
        },
        {
          type: 'pawn',
          tile: 9,
          color: 'white'
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 1)).toBe(true)
      expect(canPieceMoveToTile(board, pieces, [], pieces[2], 9)).toBe(true)
    })
  })

  describe('knight movement', () => {
    it('can move in an L-shaped pattern', () => {
      board[27] = 0
      let pieces = [{
        type: 'knight',
        color: 'white',
        tile: 27
      }]

      let allowedTiles = [10, 12, 17, 21, 33, 37, 42, 44]
      for (let i = 0, end = allowedTiles.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], allowedTiles[i])).toBe(true)
      }
    })

    it('cannot move in any other pattern but an L-shape', () => {
      board[27] = 0
      let pieces = [{
        type: 'knight',
        color: 'white',
        tile: 27
      }]

      let allowedTiles = [10, 12, 17, 21, 33, 37, 42, 44]
      for (let i = 0, end = 64; i < end; i++) {
        if (!allowedTiles.includes(i)) {
          expect(canPieceMoveToTile(board, pieces, [], pieces[0], i)).toBe(false)
        }
      }
    })

    it('cannot move the knight in a way that would take it off the board', () => {
      board[8] = 0
      board[23] = 1
      let pieces = [
        {
          type: 'knight',
          color: 'white',
          tile: 16
        },
        {
          type: 'knight',
          color: 'white',
          tile: 23
        }
      ]

      let check1 = [-1, 6, 22, 31]
      for (let i = 0, end = check1.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], check1[i])).toBe(false)
      }

      let check2 = [8, 17, 33, 40]
      for (let i = 0, end = check2.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[1], check2[i])).toBe(false)
      }
    })

    it('can move through friendly pieces', () => {
      board[27] = 0
      board[28] = 1
      board[29] = 2
      board[35] = 3
      board[36] = 4
      let pieces = [
        {
          type: 'knight',
          color: 'white',
          tile: 27
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 28
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 29
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 35
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 36
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 37)).toBe(true)
    })

    it('can move through enemy pieces', () => {
      board[27] = 0
      board[28] = 1
      board[29] = 2
      board[35] = 3
      board[36] = 4
      let pieces = [
        {
          type: 'knight',
          color: 'white',
          tile: 27
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 28
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 29
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 35
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 36
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 37)).toBe(true)
    })

    it('can end it\'s move on an enemy piece', () => {
      board[27] = 0
      board[37] = 1
      let pieces = [
        {
          type: 'knight',
          color: 'white',
          tile: 27
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 37
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 37)).toBe(true)
    })
  })

  describe('bishop movement', () => {
    it('bishops can move in diagonal lines', () => {
      board[35] = 0
      let pieces = [{
        type: 'bishop',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [7, 8, 14, 17, 21, 26, 28, 42, 44, 49, 53, 56, 62]
      for (let i = 0, end = allowedTiles.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], allowedTiles[i])).toBe(true)
      }
    })
    it('bishops cannot move in anything that\'s not a diagonal line', () => {
      board[35] = 0
      let pieces = [{
        type: 'bishop',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [7, 8, 14, 17, 21, 26, 28, 42, 44, 49, 53, 56, 62]
      for (let i = 0, end = allowedTiles.length; i < end; i++) {
        if (!allowedTiles.includes(i)) {
          expect(canPieceMoveToTile(board, pieces, [], pieces[0], i)).toBe(false)
        }
      }
    })
    it('bishops cannot move through friendly pieces', () => {
      board[35] = 0
      board[26] = 1
      let pieces = [
        {
          type: 'bishop',
          color: 'white',
          tile: 35
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 26
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 17)).toBe(false)
    })
    it('bishops cannot move through enemy pieces', () => {
      board[35] = 0
      board[26] = 1
      let pieces = [
        {
          type: 'bishop',
          color: 'white',
          tile: 35
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 26
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 17)).toBe(false)
    })
    it('bishops can end the turn on an enemy piece', () => {
      board[35] = 0
      board[17] = 1
      let pieces = [
        {
          type: 'bishop',
          color: 'white',
          tile: 35
        },
        {
          type: 'pawn',
          color: 'black',
          tile: 17
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 17)).toBe(true)
    })
  })

  describe('queen movement', () => {
    it('queens can move vertically, horizontally, or diagonally', () => {
      board[35] = 0
      let pieces = [{
        type: 'queen',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [3, 7, 8, 11, 14, 17, 19, 21, 26, 27, 28, 32, 33, 34, 36, 37, 38, 39, 42, 43, 44, 49, 51, 53, 56, 59, 62]
      for (let i = 0, end = allowedTiles.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], allowedTiles[i])).toBe(true)
      }
    })
    it('queens cannot move into disallowed positions', () => {
      board[35] = 0
      let pieces = [{
        type: 'queen',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [3, 7, 8, 11, 14, 17, 19, 21, 26, 27, 28, 32, 33, 34, 36, 37, 38, 39, 42, 43, 44, 49, 51, 53, 56, 59, 62]
      for (let i = 0, end = allowedTiles.length; i < end; i++) {
        if (!allowedTiles.includes(i)) {
          expect(canPieceMoveToTile(board, pieces, [], pieces[0], i)).toBe(false)
        }
      }
    })
    it('queens cannot move through units', () => {
      board[35] = 0
      board[26] = 1
      board[27] = 2
      board[28] = 3
      board[34] = 4
      board[36] = 5
      board[42] = 6
      board[43] = 7
      board[44] = 8

      let pieces = [
        {
          type: 'queen',
          color: 'white',
          tile: 35
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 26
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 27
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 28
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 34
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 36
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 42
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 43
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 44
        }
      ]

      let checkedTiles = [17, 18, 19, 20, 21, 25, 29, 33, 37, 41, 45, 49, 50, 51, 52, 53]
      for (let i = 0, end = checkedTiles.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], checkedTiles[i])).toBe(false)
      }
    })
  })

  describe('king movement', () => {
    it('king can move 1 tile in any direction', () => {
      board[35] = 0
      let pieces = [{
        type: 'king',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [26, 27, 28, 34, 36, 42, 43, 44]
      for (let i = 0, end = allowedTiles.length; i < end; i++) {
        expect(canPieceMoveToTile(board, pieces, [], pieces[0], allowedTiles[i])).toBe(true)
      }
    })
    it('king cannot move further than 1 tile in any direction', () => {
      board[35] = 0
      let pieces = [{
        type: 'king',
        color: 'white',
        tile: 35
      }]

      let allowedTiles = [26, 27, 28, 34, 36, 42, 43, 44]
      for (let i = 0, end = 64; i < end; i++) {
        if (!allowedTiles.includes(i)) {
          expect(canPieceMoveToTile(board, pieces, [], pieces[0], i)).toBe(false)
        }
      }
    })
    it('white king can castle if all conditions are met', () => {
      board[3] = 0
      board[0] = 1
      board[7] = 2
      let pieces = [
        {
          type: 'king',
          color: 'white',
          tile: 3,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 0,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 7,
          moves: 0
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 1)).toBe(true)
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 6)).toBe(true)
    })
    it('white king cannot castle if he has moved already', () => {
      board[3] = 0
      board[0] = 1
      board[7] = 2
      let pieces = [
        {
          type: 'king',
          color: 'white',
          tile: 3,
          moves: 1
        },
        {
          type: 'rook',
          color: 'white',
          tile: 0,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 7,
          moves: 0
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 1)).toBe(false)
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 6)).toBe(false)
    })
    it('white king cannot castle if the rook has moved', () => {
      board[3] = 0
      board[0] = 1
      board[7] = 2
      let pieces = [
        {
          type: 'king',
          color: 'white',
          tile: 3,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 0,
          moves: 1
        },
        {
          type: 'rook',
          color: 'white',
          tile: 7,
          moves: 1
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 1)).toBe(false)
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 6)).toBe(false)
    })
    it('white king cannot castle if a piece is in the way', () => {
      board[3] = 0
      board[0] = 1
      board[7] = 2
      board[2] = 3
      board[5] = 4
      let pieces = [
        {
          type: 'king',
          color: 'white',
          tile: 3,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 0,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 7,
          moves: 0
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 2
        },
        {
          type: 'pawn',
          color: 'white',
          tile: 5
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 1)).toBe(false)
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 6)).toBe(false)
    })
    it('white king cannot castle if any positions are under attack', () => {
      board[3] = 0
      board[0] = 1
      board[7] = 2
      board[58] = 3
      board[61] = 4
      let pieces = [
        {
          type: 'king',
          color: 'white',
          tile: 3,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 0,
          moves: 0
        },
        {
          type: 'rook',
          color: 'white',
          tile: 7,
          moves: 0
        },
        {
          type: 'rook',
          color: 'black',
          tile: 58
        },
        {
          type: 'rook',
          color: 'black',
          tile: 61
        }
      ]

      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 1)).toBe(false)
      expect(canPieceMoveToTile(board, pieces, [], pieces[0], 6)).toBe(false)
    })
  })
})
