<?php

// app/Http/Controllers/FollowController.php

namespace App\Http\Controllers;

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

        return response()->json(['message' => 'User followed successfully']);
    }

    public function unfollowUser(Request $request)
    {
        $followerId = $request->input('follower_id');
        $followingId = $request->input('following_id');

        // Assuming you have a Follow model with a 'follower_id' and 'following_id' columns
        Follow::where('follower_id', $followerId)->where('following_id', $followingId)->delete();

        return response()->json(['message' => 'User unfollowed successfully']);
    }
}
