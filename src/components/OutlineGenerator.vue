<template>
    <div>
        <ul>
            <li v-for="header in headers" :key="header.id">
                <a :href="`#${header.id}`">{{ header.text }}</a>
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

const headers = computed(() => {
    const headersArray = [];
    const regex = /<h([1-6]) id="(.+?)">(.+?)<\/h\1>/g;
    let match;
    while ((match = regex.exec(props.content)) !== null) {
        headersArray.push({
            id: match[2],
            text: match[3],
        });
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