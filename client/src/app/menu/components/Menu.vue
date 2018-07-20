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
      <router-link tag="span" to="#">
        <a
          class="btn unavailable"
          title="this option is not coded in yet :)">
          Random Unranked Game
        </a>
      </router-link>
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
export default {
  name: 'mainMenu'
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
