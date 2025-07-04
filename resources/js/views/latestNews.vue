<template>
    <HeaderComponent />
    <div class="mt-5" id="news">
        <h3 class="px-20 py-4 font-bold text-left text-5xl italic capitalize">Latest News</h3>

        <div class="px-20 py-5 grid grid-cols-3 gap-6">
            <LatestNewsComponent
                v-for="(newsItem, index) in latestNews" 
                :key="index" 
                :news="newsItem"
                :timeShow="false"
            />

            <div v-if="latestNewsLoading" class="w-full flex flex-col items-start space-y-3 text-left animate-pulse col-span-3 sm:col-span-1">
                <div class="w-full h-50 bg-gray-300 rounded-lg"></div>
                <div class="w-3/4 h-6 bg-gray-300 rounded"></div>
                <div class="w-full h-4 bg-gray-300 rounded"></div>
                <div class="pt-7 flex items-center space-x-2 text-gray-500">
                    <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div class="w-16 h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import LatestNewsComponent from '../components/LatestNewsComponent.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useNewsStore } from '@/stores/NewsStore';

const newsStore = useNewsStore();

const latestNews = ref([]);
const latestNewsLoading = ref(true);

const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreData = ref(true);

const getlatestNews = async (page) => {
    try {
        latestNewsLoading.value = true;

        const latestNewsResponse = await newsStore.getLatestNews(page);

        if (latestNewsResponse.data && latestNewsResponse.data.data.data.length > 0) {
            latestNews.value = [...latestNews.value, ...latestNewsResponse.data.data.data];
        }
        else{
            hasMoreData.value = false;
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
    finally {
        latestNewsLoading.value = false;
    }
}

const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading.value && hasMoreData.value) {
        isLoading.value = true;
        currentPage.value += 1;
        getlatestNews(currentPage.value).then(() => {
            isLoading.value = false;
        });
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    getlatestNews(currentPage.value);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>