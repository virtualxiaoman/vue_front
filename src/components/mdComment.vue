<template>
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/default.min.css">
        <textarea v-model="comment" placeholder="Write your comment in Markdown...该功能正在写。。发不了评论。"></textarea>
        <div v-html="parsedComment" class="markdown-body"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {marked} from 'marked';
import hljs from 'highlight.js';
import "github-markdown-css"

const comment = ref('');

const parsedComment = computed(() =>
    marked(comment.value, {
        highlight: (code: string) => hljs.highlightAuto(code).value,
    })
);
</script>

<style scoped>
textarea {
    width: 70%;
    height: 150px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #e1e4e8;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.markdown-body {
    padding: 10px;
    border: 1px solid #e1e4e8;
}
</style>