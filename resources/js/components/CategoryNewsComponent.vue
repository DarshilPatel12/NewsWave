<template>
    <router-link :to="{ name: 'particularNews', params: { id: news.id } }">
        <div class="relative w-full h-[500px] bg-cover bg-center flex flex-col justify-end px-5 pb-6" :style="{ backgroundImage: `url(${news?.urlToImage || 'fallback-image.jpg'})` }">
            <div class="absolute inset-0 bg-black/30"></div>

            <div class="relative z-10 text-white">
                <p class="text-left font-bold text-4xl text-white p-4 rounded-md max-w-2xl">
                    <p class="text-sm pb-5">{{ news.category }} | {{ timeAgoComputed }}</p>
                    {{ news.title.length > 60 ? news.title.slice(0, 60) + '...' : news.title }}
                </p>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    news: {
        type: Object,
        required: true,
    }
});

const timeAgo = (timestamp) => {
    const now = new Date();
    const publishedDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);

    if (minutes < 1) {
        return 'Just now';
    } else if (minutes === 1) {
        return '1 minute ago';
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } 

    const hours = Math.floor(minutes / 60);
    if (hours === 1) {
        return '1 hour ago';
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } 

    const days = Math.floor(hours / 24);
    if (days === 1) {
        return 'Yesterday';
    } else if (days < 30) {
        return `${days} days ago`;
    } 

    const months = Math.floor(days / 30);
    if (months === 1) {
        return '1 month ago';
    } else if (months < 12) {
        return `${months} months ago`;
    } 

    const years = Math.floor(days / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
};

const timeAgoComputed = computed(() => timeAgo(props.news.published_at));
</script>