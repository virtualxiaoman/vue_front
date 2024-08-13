<template>
    <div class="blog-section">
    <div class="blog-post"  @click="goToArticle">
        <img src="/BG_Shiroko.png" alt="博客图片">
        <div class="post-info">
            <h3>文章标题</h3>
            <p>文章内容简介...</p>
        </div>
    </div>
    <div class="blog-post">
        <img src="/BG_Shiroko.png" alt="博客图片">
        <div class="post-info">
            <h3>文章标题</h3>
            <p>文章内容简介...</p>
        </div>
    </div>
    <div class="blog-post">
        <img src="/BG_Shiroko.png" alt="博客图片">
        <div class="post-info">
            <h3>文章标题</h3>
            <p>文章内容简介...</p>
        </div>
    </div>
    <div class="blog-post">
        <img src="/BG_Shiroko.png" alt="博客图片">
        <div class="post-info">
            <h3>文章标题</h3>
            <p>文章内容简介...</p>
        </div>
    </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToArticle = () => {
//   router.push('/test'); // 跳转到指定路径
  window.location.href = '/test';
};

</script>

<style scoped>
.blog-post {
    display: flex;
    margin-bottom: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.blog-post img {
    width: 25%;
    height: 175px;
    object-fit: cover;
}

.post-info {
    padding: 1rem;
}

.post-info h3 {
    margin: 0;
    font-size: 24px;
    color: #409EFF;
}

.post-info p {
    margin: 12px 0;
    color: #73767a;
}
</style>