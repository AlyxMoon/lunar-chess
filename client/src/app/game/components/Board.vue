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
        <span v-if="showTileNumbers" class="tile-number">{{tile + 1}}</span>
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
    <div class="options">
      <h1>Display Options</h1>
      <p>
        <input type="checkbox" name="showPossibleMoves" :checked="showPossibleMoves" @click="toggleOption('showPossibleMoves')" />
        <label for="showPossibleMoves">Highlight the possible moves of the currently selected piece.</label>
      </p>

      <p>
        <input type="checkbox" name="showTileNumbers" :checked="showTileNumbers" @click="toggleOption('showTileNumbers')" />
        <label for="showTileNumbers">Show tile numbers.</label>
      </p>
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
      currentPlayer: state => state.game.currentPlayer,
      showPossibleMoves: state => state.game.options.showPossibleMoves,
      showTileNumbers: state => state.game.options.showTileNumbers
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
      'setOrMoveActivePiece',
      'toggleOption'
    ])
  }
}
</script>

<style scoped lang="scss">
  .chessboard {
    background-color: black;
    border: 2px solid rgba(0,0,0,0.8);
    border-radius: 10px;
    box-shadow: 3px 3px 20px 3px grey;
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    grid-gap: 1px;
    grid-template-columns: repeat(8, 1fr);
    height: 600px;
    margin: auto;
    overflow: hidden;
    width: 600px;
  }

  .tile {
    position: relative;

    &.tile-a {
      background-color: #EEE;
    }

    &.tile-b {
      background-color: green;
    }

    &.active {
      background-color: #2CB32C;
    }

    &.tile-possibleMove {
      background-color: #20B2AA;
      cursor: pointer;
    }
  }

  .tile-number {
    position: absolute;
    top: 0;
    left: 2px;
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

    &.selectable {
      cursor: pointer;
    }

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
