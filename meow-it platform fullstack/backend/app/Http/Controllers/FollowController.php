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

    public function destroy($id)
    {
        // Find the follow relationship by ID
        $follow = Follow::find($id);

        // Check if the follow relationship exists
        if (!$follow) {
            return response()->json(['message' => 'Follow relationship not found'], 404);
        }

        // Delete the follow relationship
        $follow->delete();

        // You can customize the response as needed
        return response()->json(['message' => 'Follow relationship deleted successfully']);
    }
}
