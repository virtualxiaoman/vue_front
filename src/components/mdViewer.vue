<template>
    <div v-html="content" class="markdown-body"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {marked} from 'marked';
import hljs from 'highlight.js';
import "github-markdown-css"


const props = defineProps({
    fileName: {
        type: String,
        required: true,
    },
});

const content = ref('');

onMounted(async () => {
    console.log("mdViewer.vue", props.fileName);
    const md_url = `/md_article/${props.fileName}.md`;
    const response = await axios.get(md_url);
    console.log("mdViewer.vue", response.data);
    console.log("mdViewer.vue", response.data);
    content.value = marked(response.data, {
        highlight: (code) => hljs.highlightAuto(code).value,
    });
});
</script>

<style scoped>
/* .markdown-body {
    padding: 20px;
    border: 1px solid #e1e4e8;
} */
</style>