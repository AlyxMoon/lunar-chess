<template>
  <div class="main-menu">
    <h1>Main Menu</h1>
    <div class="center button-group button-group-vertical">
      <router-link tag="span" to="/game">
        <a class="btn">Hotseat Game</a>
      </router-link>
      <router-link tag="span" to="#">
        <a
          class="btn unavailable"
          title="this option is not coded in yet :)">
          Random Ranked Game
        </a>
      </router-link>
      <span>
        <a class="btn" @click.prevent="requestGame({ type: 'unranked' })">
          Random Unranked Game
        </a>
      </span>
      <router-link tag="span" to="#">
        <a
          class="btn unavailable"
          title="this option is not coded in yet :)">
          Resume Game
        </a>
      </router-link>
      <router-link tag="span" to="#">
        <a
          class="btn unavailable"
          title="this option is not coded in yet :)">
          View Previous Games
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'mainMenu',
  methods: {
    ...mapActions(['requestGame'])
  }
}
</script>

<style scoped lang="scss">
  .button-group-vertical {
    span {
      display: block;
    }
  }

  .center {
    * {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }
</style>
