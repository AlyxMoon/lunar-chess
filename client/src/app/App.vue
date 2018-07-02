<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background-color: black;
  background-image: url('/static/img/what-the-hex-dark.png');
  color: #E6E6E6;
  font-family: 'Roboto Slab', serif;
}

button, .btn {
  cursor: pointer;
}

</style>
