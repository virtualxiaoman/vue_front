<template>
    <div class="clearfix">
        <div class="sidebar">
            <OutlineGenerator :content="content" />
        </div>
        <div class="main-content">
            <MarkdownViewer :fileName="fileName" @contentLoaded="updateContent" />
            <MarkdownComment />
        </div>
    </div>
</template>

<script setup  lang="ts">
import { ref } from 'vue';
import MarkdownViewer from './mdViewer.vue';
import OutlineGenerator from './OutlineGenerator.vue';
import MarkdownComment from './mdComment.vue';

const props = defineProps({
    fileName: {
        type: String,
        required: true,
    },
});

const content = ref('');

function updateContent(newContent: string) {
    content.value = newContent;
}

console.log("BlogPage.vue", props.fileName);
</script>

<style scoped>
.sidebar {
    float: left;
    width: 20%;
}

.main-content {
    float: right;
    width: 75%;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}
</style>