<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header class="l-header">
    <h1>TMW</h1>
    <span>-</span>
    <h2>Typing memorize words.</h2>
  </header>

  <div class="l-content">
    <RouterView />
  </div>

  <footer class="l-footer">
    <a href="https://github.com/yuexiaoliang/tmw" target="_blank">Github</a>

    <a href="mailto:2220124666@qq.com">2220124666@qq.com</a>
  </footer>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.l-header {
  display: flex;
  align-items: center;
  padding: 20px;

  h1 {
    font-size: 30px;
    font-weight: bold;
  }

  h2 {
    font-size: 20px;
  }

  span {
    margin: 0 15px;
  }
}

.l-content {
  flex: 1;
}

.l-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;

  a {
    margin: 0 10px;
  }
}
</style>
