<template>
  <div id="app">
    <header-layout></header-layout>
    <div id="app">
        <router-view/>
    </div>
    <footer-layout></footer-layout>
  </div>
</template>

<style lang="scss">

#nav {


  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
