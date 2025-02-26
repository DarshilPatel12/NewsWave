<template>
    <HeaderComponent />
    <div class="mt-10">
        <div v-if="!particularNewsLoading && particularNews">
            <ParticularNewsComponent :news="particularNews" />
        </div>
        <div v-else>
            <div class="flex px-20 space-x-6 animate-pulse">
                <div class="w-3/4 text-left">
                    <div class="w-full h-100 bg-gray-300 rounded-lg"></div>

                    <div class="mt-5 h-10 w-3/4 bg-gray-300 rounded"></div>
                    <div class="mt-8 h-6 w-full bg-gray-300 rounded"></div>
                    <div class="mt-3 h-20 w-full bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import ParticularNewsComponent from '../components/ParticularNewsComponent.vue';
import { ref, onMounted } from 'vue';
import { useNewsStore } from '@/stores/NewsStore';

const props = defineProps(['id']);
const newsStore = useNewsStore();

const particularNews = ref(null);
const particularNewsLoading = ref(true);

const getParticularNews = async () => {
    try {
        const particularNewsResponse = await newsStore.getParticularNews(props.id);

        if (particularNewsResponse.data) {
            particularNews.value = particularNewsResponse.data.data;
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
    finally {
        particularNewsLoading.value = false;
    }
}

onMounted(async () => {
    getParticularNews();
});
</script>