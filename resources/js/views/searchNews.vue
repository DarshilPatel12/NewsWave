<template>
    <HeaderComponent />
    <div class="mt-5" id="news">
        <h3 class="px-20 py-4 font-bold text-left text-5xl">Search Result for <span class="italic">{{ props.search }}</span></h3>

        <div class="px-20 py-5 grid grid-cols-3 gap-6">
            <LatestNewsComponent
                v-for="(newsItem, index) in searchNews" 
                :key="index" 
                :news="newsItem"
                :timeShow="false"
            />

            <div v-if="searchNewsLoading" class="w-full flex flex-col items-start space-y-3 text-left animate-pulse col-span-3 sm:col-span-1">
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

const props = defineProps(['search']);
const newsStore = useNewsStore();

const searchNews = ref([]);
const searchNewsLoading = ref(true);

const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreData = ref(true);

const getSearchNews = async (page) => {
    try {
        searchNewsLoading.value = true;

        const searchNewsResponse = await newsStore.getSearchNews(props.search, page);

        if (searchNewsResponse.data && searchNewsResponse.data.data.data.length > 0) {
            searchNews.value = [...searchNews.value, ...searchNewsResponse.data.data.data];
        }
        else{
            hasMoreData.value = false;
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
    finally {
        searchNewsLoading.value = false;
    }
}

const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading.value && hasMoreData.value) {
        isLoading.value = true;
        currentPage.value += 1;
        getSearchNews(currentPage.value).then(() => {
            isLoading.value = false;
        });
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    getSearchNews(currentPage.value);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>