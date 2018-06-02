<template>
  <div>
    <div class="chessboard">
      <div :class="getTileType(i)" v-for="i in 64" :key="i - 1">
        <div class="piece-wrapper" v-if="isPieceOnTile(i - 1)">
          <img
            class="piece"
            :src="getImageOfPieceOnTile(i - 1)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'gameBoard',
  computed: {
    ...mapState({
      pieces: state => state.game.pieces
    }),
    ...mapGetters([
      'getTileType',
      'isPieceOnTile',
      'getImageOfPieceOnTile'
    ])
  }
}
</script>

<style scoped>
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

  .tile-a {
    background-color: #EEE;
  }

  .tile-b {
    background-color: green;
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
  }
</style>
