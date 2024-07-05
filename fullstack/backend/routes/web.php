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
| Here is where you can register web routes for your application.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'api'], function () {
    // GET data
    Route::get('/all-tracks', [TrackController::class, 'index'])->name('tracks.index');
    Route::get('/all-users', [UserController::class, 'index'])->name('users.index');
    Route::get('/all-categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/all-notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/all-follows', [FollowController::class, 'index'])->name('follows.index');
    Route::get('/all-likes', [LikeController::class, 'index'])->name('likes.index');

    // PUT data
    Route::post('/track/store', [TrackController::class, 'store'])->name('track.store');
    Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
    Route::post('/user/register', [UserController::class, 'register'])->name('user.register');
    Route::post('/notification/store', [NotificationController::class, 'store'])->name('notification.store');
    Route::post('/follow', [FollowController::class, 'followUser'])->name('follow.store');
    Route::post('/like', [LikeController::class, 'store'])->name('like.store');

    // ALTER Data
    Route::post('/user/update/{id}', [UserController::class, 'update'])->name('user.update');

    // DELETE data
    Route::delete('/track/delete/{id}', [TrackController::class, 'destroy'])->name('track.delete');
    Route::delete('/notification/delete', [NotificationController::class, 'destroy'])->name('notification.delete');
    Route::delete('/unfollow/{followerId}/{followingId}', [FollowController::class, 'unfollowUser'])->name('unfollow');
    Route::delete('/like/{userId}/{trackId}', [LikeController::class, 'destroy'])->name('like.delete');
});

