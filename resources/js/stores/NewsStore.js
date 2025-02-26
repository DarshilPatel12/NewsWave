import axios from "axios";
import { defineStore } from "pinia";

export const useNewsStore = defineStore('newsStore', {
    actions: {
        async getParticularNews(id){
            const response = await axios.get(`/api/particular-news/${id}`);
            return response;
        },
        async getBreakingNews(){
            const response = await axios.get(`/api/breking-news`);
            return response;
        },
        async getLatestNews(){
            const response = await axios.get(`/api/latest-news`);
            return response;
        },
        async getTopHeadlineNews(){
            const response = await axios.get(`/api/top-headline-news`);
            return response;
        },
        async getRelatedNews(id){
            const response = await axios.get(`/api/related-news/${id}`);
            return response;
        },
    }
})