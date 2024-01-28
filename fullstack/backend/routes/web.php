<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LikeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// GET data
Route::group(['prefix' => 'api'], function () {
    Route::get('/all-tracks', [TrackController::class, 'index']);
    Route::get('/all-users', [UserController::class, 'index']);
    Route::get('/all-categories', [CategoryController::class, 'index']);
    Route::get('/all-notifications', [NotificationController::class, 'index']);
    Route::get('/all-follows', [FollowController::class, 'index']);
    Route::get('/all-likes', [LikeController::class, 'index']);
});

// PUT data
Route::group(['prefix' => 'api'], function () {
    //Track
    Route::post('/track/store', [TrackController::class, 'store']);

    //User
    Route::post('/user/store', [UserController::class, 'store']);

    //User
    Route::post('/user/register', [UserController::class, 'register']);

    //Notification
    Route::post('/notification/store', [NotificationController::class, 'store']);

    //Follows
    Route::post('/follow', [FollowController::class, 'followUser']);

    //Like
    Route::post('/like', [LikeController::class, 'store']);
});

// ALTER Data
Route::group(['prefix' => 'api'], function () {
    //User
    Route::post('/user/update/{id}', [UserController::class, 'update']);
});

// DELETE data
Route::group(['prefix' => 'api'], function () {
    //Tracks
    Route::delete('/track/delete/{id}', [TrackController::class, 'destroy']);

    //Notification
    Route::delete('/notification/delete', [NotificationController::class, 'destroy']);

    //Follows
    Route::delete('/unfollow/{followerId}/{followingId}', [FollowController::class, 'unfollowUser']);

    //Like
    Route::delete('/like/{userId}/{trackId}', [LikeController::class, 'destroy']);
});
