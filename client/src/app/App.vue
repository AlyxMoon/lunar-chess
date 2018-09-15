<template>
  <div id="app">
    <component-navbar></component-navbar>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Navbar } from './fragments'

export default {
  name: 'App',

  components: {
    'component-navbar': Navbar
  },

  methods: mapActions(['existingLogin']),

  created () {
    this.$store.dispatch('existingLogin')
  }
}
</script>

<style lang="scss">
body {
  background-color: black;
  background-image: url('/static/img/what-the-hex-dark.png');
  color: #E6E6E6;
  font-family: 'Roboto Slab', serif;
}

button, .btn {
  cursor: pointer;
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
  text-align: center;
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
