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
        async getLatestNews(page){
            const response = await axios.get(`/api/latest-news?page=${page}`);
            return response;
        },
        async getTopHeadlineNews(page){
            const response = await axios.get(`/api/top-headline-news?page=${page}`);
            return response;
        },
        async getRelatedNews(id){
            const response = await axios.get(`/api/related-news/${id}`);
            return response;
        },
        async getCategoryNews(category, page){
            const response = await axios.get(`/api/category-news/${category}?page=${page}`);
            return response;
        },
    }
})