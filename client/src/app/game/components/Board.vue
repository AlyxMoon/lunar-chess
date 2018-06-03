<template>
  <div>
    <div class="game-data">
      <h2>Current Player's Turn: {{ currentPlayer }}</h2>
    </div>
    <div class="chessboard">
      <div
        :class="getTileClasses(tile)"
        v-for="(pieceIndex, tile) in board"
        :key="tile"
        @click="setOrMoveActivePiece(tile)" >
        <div class="piece-wrapper" v-if="isPieceOnTile(tile)">
          <i
            :class="getPieceClasses(pieceIndex)"
            :key="`pieces-${pieceIndex}`"
            />
        </div>
      </div>
    </div>
    <div class="graveyard">
      <h1>Graveyard</h1>
      <ul>
        <li v-for="(piece, i) in getKilledPieces()" :key="i">
          {{ piece.type }} -- {{ piece.color }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'gameBoard',
  computed: {
    ...mapState({
      board: state => state.game.board,
      pieces: state => state.game.pieces,
      currentPlayer: state => state.game.currentPlayer
    }),
    ...mapGetters([
      'getTileClasses',
      'isPieceOnTile',
      'getPieceClasses',
      'getKilledPieces'
    ])
  },
  methods: {
    ...mapActions([
      'setOrMoveActivePiece'
    ])
  }
}
</script>

<style scoped lang="scss">
  .chessboard {
    background-color: black;
    border: 1px solid black;
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    grid-gap: 1px;
    grid-template-columns: repeat(8, 1fr);
    height: 600px;
    margin: auto;
    width: 600px;
  }

  .tile {
    &.tile-a {
      background-color: #EEE;
    }

    &.tile-b {
      background-color: green;
    }

    &.active {
      background-color: #2CB32C;
    }
  }

  .piece-wrapper {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  }

  .piece {
    height: 70%;
    width: 70%;

    font-style: normal;
    font-size: 6vh;
    line-height: 6vh;
    text-align: center;

    &.white {
      &.bishop {
        &::after {
          content: '♗';
        }
      }
      &.king {
        &::after {
          content: '♔';
        }
      }
      &.knight {
        &::after {
          content: '♘';
        }
      }
      &.pawn {
        &::after {
          content: '♙';
        }
      }
      &.queen {
        &::after {
          content: '♕';
        }
      }
      &.rook {
        &::after {
          content: '♖';
        }
      }
    }

    &.black {
      &.bishop {
        &::after {
          content: '♝';
        }
      }
      &.king {
        &::after {
          content: '♚';
        }
      }
      &.knight {
        &::after {
          content: '♞';
        }
      }
      &.pawn {
        &::after {
          content: '♟';
        }
      }
      &.queen {
        &::after {
          content: '♛';
        }
      }
      &.rook {
        &::after {
          content: '♜';
        }
      }
    }
  }

</style>
