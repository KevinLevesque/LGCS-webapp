<template>
  <div id="app">
    <div class="container-wrapper">
      <div class="container">
        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">

  .container-wrapper {
    display: flex;
    justify-content: center;
    background-color: #eee;
    padding: 1em;
    .container {
      background-color: #fff;
      padding: 1em;
      width: 1200px;
      box-shadow: 0px 0px 4px 0px #000;
    }

  }

</style>
