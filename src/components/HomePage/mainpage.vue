<template>
  <div class="main-section">
    <BlogPost />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BlogPost from './blogpost.vue';

</script>

<style scoped>
.main-section {
  padding: 2rem;
  background-color: #f5f5f5;
  margin-left: 10%;
  margin-right: 10%;
}

</style>