<template>
    <div>
        <BlogPage v-if="fileName" :fileName="fileName" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BlogPage from '../../components/BlogPage.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';


const route = useRoute();
const fileName = ref('');

onMounted(async () => {
    // 使用路由参数来获取文件名
    const articleName = route.params.name;
    console.log("test.vue", articleName);
    fileName.value = articleName;
    console.log("test.vue", fileName.value);
    // // 假设服务器已经配置好，可以直接访问public目录下的文件
    // try {
    //     const response = await axios.get(`/md_article/${articleName}.md`);
    //     markdownContent.value = response.data;
    // } catch (error) {
    //     console.error('Error fetching markdown content:', error);
    //     // 错误处理，例如设置markdownContent为错误信息
    //     markdownContent.value = 'Failed to load the article.';
    // }
});
</script>


<!-- <template>
    <textarea v-model="markdown"></textarea>
    <div v-html="markdownToHtml"></div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import {marked} from 'marked';
  
  const markdown = ref(""); // 使用 ref 来创建响应式数据
  const markdownToHtml = computed(() => marked(markdown.value)); // 使用 computed 来处理 markdown 渲染
  
  </script>
  
  <style>

  </style> -->
  <!-- <template>
    <div>
      <vue-markdown :source="markdown"></vue-markdown>
    </div>
  </template>
  
  <script>
  import VueMarkdown from 'vue-markdown'
  
  export default {
    data() {
      return {
        markdown: '# Hello, Vue Markdown!'
      }
    },
    components: {
      VueMarkdown
    }
  }
  </script>
   -->