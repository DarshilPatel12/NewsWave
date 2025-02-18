<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\News;
use Illuminate\Support\Facades\Http;

class FetchNews extends Command
{
    protected $signature = 'fetch:news';
    protected $description = 'Fetch latest news from NewsAPI and store it in the database';

    public function handle()
    {
        $apiKey = env('NEWS_API_KEY');
        $response = Http::get("https://newsapi.org/v2/top-headlines?country=us&apiKey={$apiKey}");

        if ($response->failed()) {
            $this->error('Failed to fetch news.');
            return;
        }

        $newsData = $response->json();

        if (!isset($newsData['articles'])) {
            $this->error('No articles found.');
            return;
        }

        foreach ($newsData['articles'] as $article) {
            News::updateOrCreate(
                ['url' => $article['url']],
                [
                    'source' => $article['source']['name'] ?? null,
                    'author' => $article['author'] ?? null,
                    'title' => $article['title'],
                    'description' => $article['description'] ?? null,
                    'urlToImage' => $article['urlToImage'] ?? null,
                    'content' => $article['content'] ?? null,
                    'category' => "general",
                    'published_at' => date('Y-m-d H:i:s', strtotime($article['publishedAt']))
                ]
            );
        }

        $this->info('News fetched and stored successfully.');
    }
}

