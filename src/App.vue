<template>
  <div id="app">
       <menu-bar />
      <router-view />
  </div>
</template>

<script>
import { MenuBar } from './components';

export default {
  name: 'app',
  components: {
    MenuBar
  },
  data () {
    return {
    }
  }
}
</script>
<style>
  html, body {
    margin: 0 0 0 0;
    background: linear-gradient(rgb(204, 226, 255),rgb(247, 229, 253));
    }
#app{height: 1000px;width: 100%;}
</style>
