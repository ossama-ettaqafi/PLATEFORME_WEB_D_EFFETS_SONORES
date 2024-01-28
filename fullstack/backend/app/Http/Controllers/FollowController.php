<?php

// app/Http/Controllers/FollowController.php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Follow;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function index()
    {
        $follows = Follow::all();
        return response()->json($follows);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'follower_id' => 'required|exists:users,id',
            'following_id' => 'required|exists:users,id',
        ]);

        // Create a new follow relationship with the validated data
        $follow = Follow::create($validatedData);

        // You can customize the response as needed
        return response()->json(['message' => 'Follow relationship created successfully', 'follow' => $follow], 201);
    }

    public function followUser(Request $request)
    {
        $followerId = $request->input('follower_id');
        $followingId = $request->input('following_id');

        // Assuming you have a Follow model with a 'follower_id' and 'following_id' columns
        Follow::create(['follower_id' => $followerId, 'following_id' => $followingId]);

        Notification::create([
            'user_id' => $followingId,
            'sender_id' => $followerId,
            'notification_type' => 1,
        ]);

        return response()->json(['message' => 'User followed successfully']);
    }

    public function unfollowUser($followerId, $followingId)
    {
        // Assuming you have a Follow model with 'follower_id' and 'following_id' columns
        Follow::where('follower_id', $followerId)->where('following_id', $followingId)->delete();

        Notification::where('user_id', $followingId)
        ->where('sender_id', $followerId) // Assuming the user is the sender of the track
        ->where('notification_type', 0) // Type 0 for like
        ->delete();

        return response()->json(['message' => 'User unfollowed successfully']);
    }
}
