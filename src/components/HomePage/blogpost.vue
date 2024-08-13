<template>
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
    <div class="blog-post">
        <img src="/BG_Shiroko.png" alt="博客图片">
        <div class="post-info">
            <h3>文章标题</h3>
            <p>文章内容简介...</p>
        </div>
    </div>
</template>

<script setup>


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
    width: 30%;
    height: auto;
    object-fit: cover;
}

.post-info {
    padding: 1rem;
}

.post-info h3 {
    margin: 0;
    font-size: 1.5rem;
}

.post-info p {
    margin: 0.5rem 0 0;
}
</style>