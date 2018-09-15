<template>
  <nav class="navbar">
    <ul class="nav-items-wrapper">
      <div class="nav-item">
        <router-link tag="li" to="/">
          <a class="nav-item-button">Home</a>
        </router-link>
      </div>
    </ul>
    <ul class="nav-items-wrapper align-right">
      <div class="nav-item">
        <button class="nav-item-button" @click.prevent="checkUser()">Check User</button>
      </div>
      <div v-if="!user" class="nav-item">
        <router-link tag="li" to="/login">
          <a class="nav-item-button">Login</a>
        </router-link>
      </div>
      <div v-if="user" class="nav-item">
        Logged In: {{ user.username }}
      </div>
      <div v-if="user" class="nav-item">
        <button class="nav-item-button" @click.prevent="logout({ callback: afterLogout })">Logout</button>
      </div>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import fetch from 'isomorphic-unfetch'

import { apiAddress } from '@/consts.js'

export default {
  name: 'navbar',

  computed: {
    ...mapState({
      user: state => state.menu.user
    })
  },

  methods: {
    ...mapActions([
      'logout'
    ]),
    checkUser: function () {
      fetch(`${apiAddress}/auth/profile`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(console.log)
        .catch(console.error)
    },
    afterLogout: function (err) {
      if (!err) {
        this.$router.push('/')
      }
    }
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

  &.align-right {
    margin-left: auto;
  }
}

.nav-item-button {
  background: none;
  border: none;
  color: #C3FFEE;
  font-size: 20px;
  font-weight: bold;
  padding: 0;
  text-decoration: none;
  transition-duration: 0.2s;

  &:hover {
    color: #E2FBF4;
    font-size: 22px;
  }
}

</style>
