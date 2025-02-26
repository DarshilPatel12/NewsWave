<template>
    <router-link :to="{ name: 'particularNews', params: { id: news.id } }">
        <div class="flex items-center gap-6">
            <img :src=news.urlToImage :alt=news.title class="w-30 h-30 rounded" defer>

            <div>
                <p class="font-bold text-lg">{{ news.title.length > 50 ? news.title.slice(0, 50) + '...' : news.title }}</p>
                <p class="text-gray-600">{{ news.description.length > 60 ? news.description.slice(0, 60) + '...' : news.description }}</p>
            </div>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps({
    news: {
        type: Object,
        required: true,
    }
});
</script>