<template>
    <router-link :to="{ name: 'particularNews', params: { id: news.id } }">
        <div class="w-full flex flex-col items-start space-y-3 text-left mb-10">
            <img :src=news.urlToImage :alt=news.title class="w-full h-50 rounded-lg object-cover" defer>

            <p class="font-bold text-lg">{{ news.title.length > 60 ? news.title.slice(0, 60) + '...' : news.title }}</p>
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