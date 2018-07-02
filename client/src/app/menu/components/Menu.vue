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
          View Leaderboards
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

  .btn {
    background-color: #E6E6E6;
    border: 1px solid #E6E6E6;
    border-radius: 3px;
    color: rgba(0,0,0,0.8);
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    line-height: 30px;
    margin-top: 10px;
    min-width: 300px;
    padding: 3px;
    text-decoration: none;
    transition-duration: 0.2s;

    &:hover {
      background-color: rgba(0,0,0,0.9);
      border-color: #3FB0AC;
      color: #3FB0AC;
    }

    &.unavailable {
      background: repeating-linear-gradient(
        45deg,
        #E6E6E6,
        #E6E6E6 10px,
      	#FF91A4 5px,
      	#FF91A4 20px
      );
      color: black;

      cursor: default;
      pointer-events: none;
      text-shadow: 1px 1px white;
      user-select: none;

      &:hover {
        border-color: #E6E6E6;
        color: black;
      }
    }
  }
</style>
