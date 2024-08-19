<template>
    <div>
        <ul>
            <!-- <li v-for="header in headers" :key="`${header.id}-${header.level}`">
                <a :href="`#${header.id}`">{{ header.text }}</a>
            </li> -->
            <li v-for="header in headers" :key="`${header.level}`">
                <p>{{ header.text }}</p>
            </li>
        </ul>
    </div>
</template>


<script setup>
import { computed } from 'vue';

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
});
console.log("OutlineGenerator.vue");
console.log("OutlineGenerator.vue", props.content);

// const headers = computed(() => {
//     const headersArray = [];
//     const regex = /<h([1-6])(?:\s[^>]*)? id="(.+?)">(.+?)<\/h\1>/g;
//     let match;
//     while ((match = regex.exec(props.content)) !== null) {
//         headersArray.push({
//             id: match[2],
//             text: match[3],
//             level: match[1],
//         });
//     }
//     return headersArray;
// });

// const headers = computed(() => {
//     const headersArray = [];
//     const regex = /<h([1-6])(?:\s[^>]*)?>(.+?)<\/h\1>/g;
//     let match;
//     console.log("OutlineGenerator.vue", "1111111111");
//     while ((match = regex.exec(props.content)) !== null) {
//         headersArray.push({
//             text: match[3],
//             level: match[1],
//         });
//         console.log("OutlineGenerator.vue", match[3]);
//     }
//     return headersArray;
// });
const headers = computed(() => {
    const headersArray = [];
    const regex = /<h([1-6])(?:\s[^>]*)?>(.+?)<\/h\1>/g;
    let match;
    console.log("OutlineGenerator.vue", "1111111111");
    while ((match = regex.exec(props.content)) !== null) {
        headersArray.push({
            text: match[2],  // 使用 match[2] 来获取标题文本
            level: match[1],
        });
        console.log("OutlineGenerator.vue", match[2]);
    }
    return headersArray;
});


</script>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}

a {
    text-decoration: none;
    color: #0366d6;
}
</style>
