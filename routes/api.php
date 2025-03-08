<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('breking-news', [NewsController::class, 'getBreakingNews']);
Route::get('latest-news', [NewsController::class, 'getLatestNews']);
Route::get('top-headline-news', [NewsController::class, 'getTopHeadlineNews']);

Route::get('particular-news/{id}', [NewsController::class, 'getParticularNews']);
Route::get('related-news/{id}', [NewsController::class, 'getRelatedNews']);

Route::get('category-news/{category}', [NewsController::class, 'getCategoryNews']);
Route::get('search-news/{search}', [NewsController::class, 'getSearchNews']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('subscribe', [AuthController::class, 'subscribe']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
