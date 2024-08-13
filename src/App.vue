<!-- <template>
  <div>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <p>父组件数据: {{ parentMessage }}</p>
  <ChildComponent :msg="parentMessage" @updateMessage="updateParentMessage" />
  <div>
    <DotEffect />
  </div>
</template>


<script setup lang="ts">

import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import ChildComponent from './components/ChildComponent.vue';
import DotEffect from './components/DotEffect.vue';

const parentMessage = ref('Hello from Parent');

function updateParentMessage(newMessage: string) {
  parentMessage.value = newMessage;
}
</script>


<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style> -->
<template>
  <Welcome />
  <MainPage />
</template>

<script setup>
import Welcome from './components/HomePage/welcome.vue';
import MainPage from './components/HomePage/mainpage.vue';
</script>

<style>
/* 这里可以添加全局样式 */
</style>
