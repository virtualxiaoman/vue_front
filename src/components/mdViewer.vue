<template>
    <div v-html="content" class="markdown-body"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { marked } from 'marked';
import hljs from 'highlight.js';
import "github-markdown-css";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Buffer } from 'buffer';

const props = defineProps({
    fileName: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(['contentLoaded']);


const content = ref('');


onMounted(async () => {
    console.log("mdViewer.vue", props.fileName);
    const md_url = `/md_article/${props.fileName}.md`;
    const response = await axios.get(md_url);
    console.log("mdViewer.vue", response.data);

    // First, replace LaTeX syntax with placeholder
    let mdWithPlaceholders = response.data.replace(/\$\$(.*?)\$\$/gs, (match, p1) => {
        return `{{katex_block:${Buffer.from(p1).toString('base64')}}}`;
    }).replace(/\$(.*?)\$/g, (match, p1) => {
        return `{{katex_inline:${Buffer.from(p1).toString('base64')}}}`;
    });

    // Then, pass the modified markdown through marked
    let renderedContent = marked(mdWithPlaceholders, {
        highlight: (code: string) => hljs.highlightAuto(code).value,
        renderer: new marked.Renderer(),
    });

    // Replace placeholders with KaTeX-rendered HTML
    renderedContent = renderedContent.replace(/{{katex_block:(.*?)}}/g, (match, p1) => {
        return katex.renderToString(Buffer.from(p1, 'base64').toString(), {
            throwOnError: false,
            displayMode: true
        });
    }).replace(/{{katex_inline:(.*?)}}/g, (match, p1) => {
        return katex.renderToString(Buffer.from(p1, 'base64').toString(), {
            throwOnError: false
        });
    });

    // 存储h标签的原始内容和生成的ID
    // 使用 TypeScript 的 Record 类型来声明 headings 对象
    const headings: Record<string, string> = {};

    let i = 0; // 用于生成递增序列的变量

    // // 替换marked渲染后的HTML，为h标签生成唯一的ID
    // let processedContent = renderedContent.replace(/(<h[1-6][^>]*>)(.*?)(<\/h[1-6]>)/gi, (match, p1, p2, p3) => {
    //     // 使用h标签的内容生成一个ID，直接使用递增的i值
    //     let content = p2.trim();
    //     let id = `content${i++}`;
    //     // 更新存储生成的ID
    //     headings[content] = id;

    //     // 返回带有新ID的h标签
    //     return `${p1} id="${id}"` + p3;
    // });
    // let processedContent = renderedContent.replace(/(<h[1-6])([^>]*)>(.*?)<\/h[1-6]>/gi, (match, p1, p2, p3) => {
    //     // 使用h标签的内容生成一个ID，直接使用递增的i值
    //     let content = p3.trim();
    //     let id = `content${i++}`;
    //     // 更新存储生成的ID
    //     headings[content] = id;

    //     // 在原有的h标签属性中添加id属性，如果已有id属性则替换它
    //     let newTag = p1 + (p2 ? p2 + ' ' : '') + ` id="${id}"` + `>${p3}</${p1}>`;

    //     // 返回带有新ID的h标签
    //     return newTag;
    // });
    // // 现在 headings 对象和 processedContent 都已正确生成

    let processedContent = renderedContent;
    content.value = processedContent;
    console.log("mdViewer.vue: processedContent", processedContent);
    // 触发 contentLoaded 事件并传递渲染后的内容
    emit('contentLoaded', processedContent);
});


// onMounted(async () => {
//     console.log("mdViewer.vue", props.fileName);
//     const md_url = `/md_article/${props.fileName}.md`;
//     const response = await axios.get(md_url);
//     console.log("mdViewer.vue", response.data);

//     // First, replace LaTeX syntax with KaTeX-rendered HTML
//     let mdWithKatex = response.data.replace(/\$\$(.*?)\$\$/g, (match, p1) => {
//         return katex.renderToString(p1, {
//             throwOnError: false,
//             displayMode: true
//         });
//     }).replace(/\$(.*?)\$/g, (match, p1) => {
//         return katex.renderToString(p1, {
//             throwOnError: false
//         });
//     });

//     // Then, pass the modified markdown through marked
//     content.value = marked(mdWithKatex, {
//         highlight: (code: string) => hljs.highlightAuto(code).value,
//         renderer: new marked.Renderer(),
//     });
// });


// onMounted(async () => {
//     console.log("mdViewer.vue", props.fileName);
//     const md_url = `/md_article/${props.fileName}.md`;
//     const response = await axios.get(md_url);
//     console.log("mdViewer.vue", response.data);

//     content.value = marked(response.data, {
//         highlight: (code: string) => hljs.highlightAuto(code).value,
//         renderer: new marked.Renderer(),
//     });

//     // Render LaTeX using KaTeX
//     content.value = content.value.replace(/\$\$(.*?)\$\$/g, (match, p1) => {
//         return katex.renderToString(p1, {
//             throwOnError: false
//         });
//     }).replace(/\$(.*?)\$/g, (match, p1) => {
//         return katex.renderToString(p1, {
//             throwOnError: false
//         });
//     });
// });
</script>

<style scoped>
/* .markdown-body {
    padding: 20px;
    border: 1px solid #e1e4e8;
} */
</style>
