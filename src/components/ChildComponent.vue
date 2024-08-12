<template>
    <div>
      <p>从父组件接收到的数据: {{ msg }}</p>
      <input v-model="childMessage" placeholder="更新父组件的数据" />
      <button @click="sendUpdate">更新父组件</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps(['msg']);
  const emit = defineEmits(['updateMessage']);
  
  const childMessage = ref('干什么');
  
  function sendUpdate() {
    emit('updateMessage', childMessage.value);
  }
  </script>

  <style scoped>

  </style>
  