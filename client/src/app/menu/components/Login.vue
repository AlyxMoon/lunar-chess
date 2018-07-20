<template>
    <form @submit.prevent="login({ username, password })">
      <span v-if="isLoggedIn">test!</span>
      <div>
          <label>Username:</label>
          <input type="text" name="username" v-model="username" />
      </div>
      <div>
          <label>Password:</label>
          <input type="password" name="password" v-model="password" />
      </div>
      <input type="submit" value="Log In" />
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',

  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },

  data: () => {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    ...mapActions([
      'login'
    ])
  }
}
</script>

<style scoped lang='scss'>

</style>
