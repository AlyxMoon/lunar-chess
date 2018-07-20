<template>
  <nav class="navbar">
    <ul class="nav-items-wrapper">
      <div class="nav-item">
        <router-link tag="li" to="/">
          <a>Home</a>
        </router-link>
      </div>
    </ul>
    <ul class="nav-items-wrapper align-right">
      <div class="nav-item">
        <router-link v-if="!user" tag="li" to="/login">
          <a>Login</a>
        </router-link>
        <span v-else>
          Logged In: {{ user.username }}
        </span>
      </div>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',

  computed: {
    ...mapState({
      user: state => state.menu.user
    })
  }
}
</script>

<style lang='scss' scoped>
.navbar {
  align-items: center;
  background-color: #03070D;
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: row;
  height: 50px;
  margin: -8px -8px 0 -8px;
}

.nav-items-wrapper {
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  list-style: none;
  height: 100%;
  margin: 0;
  padding: 0;

  &.align-right {
    margin-left: auto;
  }
}

.nav-item {
  font-size: 20px;
  font-weight: bold;
  padding: 0 5px;

  a {
    color: #C3FFEE;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    transition-duration: 0.2s;

    &:hover {
      color: #E2FBF4;
      font-size: 22px;
    }
  }

  &.align-right {
    margin-left: auto;
  }
}

</style>
