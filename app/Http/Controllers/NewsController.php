<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller
{
    public function getParticularNews($id){
        $news = News::find($id);

        return response()->json([
            'status' => true,
            'message' => 'News fetched successfully',
            'data' => $news
        ]);
    }

    public function getBreakingNews(){
        $news = News::where("category", "general")->inRandomOrder()->limit(4)->get();

        return response()->json([
            'status' => true,
            'message' => 'News fetched successfully',
            'data' => $news
        ]);
    }

    public function getLatestNews(){
        $news = News::latest()->inRandomOrder()->paginate(10);

        return response()->json([
            'status' => true,
            'message' => 'News fetched successfully',
            'data' => $news
        ]);
    }

    public function getTopHeadlineNews(){
        $news = News::inRandomOrder()->paginate(10);

        return response()->json([
            'status' => true,
            'message' => 'News fetched successfully',
            'data' => $news
        ]);
    }

    public function getRelatedNews($id){
        $particularNews = News::find($id);

        $news = [];
        if($particularNews){
            $news = News::where("category", $particularNews->category)->where("id", "!=", $id)->inRandomOrder()->limit(2)->get();
        }

        return response()->json([
            'status' => true,
            'message' => 'News fetched successfully',
            'data' => $news
        ]);
    }
    
}
