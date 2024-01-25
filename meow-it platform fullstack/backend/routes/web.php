<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LikeController;

Route::get('/', function () {
    return view('welcome');
});

// Get APIs
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);
Route::get('/tracks', [TrackController::class, 'index']);
Route::get('/notifications', [NotificationController::class, 'index']);
Route::get('/follows', [FollowController::class, 'index']);
Route::get('/likes', [LikeController::class, 'index']);

// Create a track
Route::post('/tracks/{id}', [TrackController::class, 'store']);
// Delete a track
Route::delete('/tracks/{id}', [TrackController::class, 'destroy']);
