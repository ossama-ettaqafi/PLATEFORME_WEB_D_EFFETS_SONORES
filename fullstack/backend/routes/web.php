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


// APIs
Route::get('/tracks', [TrackController::class, 'index']);
Route::post('/tracks', [TrackController::class, 'store']);
Route::delete('/tracks/{id}', [TrackController::class, 'destroy']);

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/notifications', [NotificationController::class, 'index']);
Route::post('/notifications', [NotificationController::class, 'store']);

Route::get('/follows', [FollowController::class, 'index']);
Route::post('/follows', [FollowController::class, 'store']);
Route::delete('/follows/{id}', [FollowController::class, 'destroy']);

Route::get('/likes', [LikeController::class, 'index']);
Route::post('/likes', [LikeController::class, 'store']);
Route::delete('/likes/{id}', [LikeController::class, 'destroy']);
