<template>
    <div class="flex px-20 space-x-6">
        <div class="w-3/4 text-left">
            <img :src="news.urlToImage" :alt="news.title" class="w-full h-100 rounded-lg object-cover" defer>
            
            <p class="font-bold text-4xl mt-5">{{ news.title }}</p>
            <p class="mt-8">{{ news.description }}</p>
            <p class="mt-3">{{ news.content }}</p>
        </div>

        <div class="w-1/4">
            <p class="font-semibold text-left text-3xl italic mb-4">Related News</p>
            <div v-if="!relatedNewsLoading && relatedNews">
                <RelatedNewsComponent 
                    v-for="(newsItem, index) in relatedNews" 
                    :key="index" 
                    :news="newsItem"
                />
            </div>
            <div v-else>
                <template v-for="i in 2" :key="i">
                    <div class="w-full flex flex-col items-start space-y-3 text-left mb-10 animate-pulse">
                        <div class="w-full h-50 bg-gray-300 rounded-lg"></div>

                        <div class="h-6 w-3/4 bg-gray-300 rounded"></div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>


<script setup>
import RelatedNewsComponent from '../components/RelatedNewsComponent.vue';
import { ref, onMounted, computed } from 'vue';
import { useNewsStore } from '@/stores/NewsStore';

const newsStore = useNewsStore();

const relatedNews = ref(null);
const relatedNewsLoading = ref(true);

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


const getRelatedNews = async () => {
    try {
        const relatedNewsResponse = await newsStore.getRelatedNews(props.news.id);

        if (relatedNewsResponse.data) {
            relatedNews.value = relatedNewsResponse.data.data;
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
    finally {
        relatedNewsLoading.value = false;
    }
}

onMounted(async () => {
    getRelatedNews();
});
</script>