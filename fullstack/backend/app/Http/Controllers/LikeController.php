<?php

// app/Http/Controllers/LikeController.php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Notification;
use App\Models\Track;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index()
    {
        $likes = Like::all();
        return response()->json($likes);
    }

    public function store(Request $request)
    {
        $like = Like::create([
            'user_id' => $request->user_id,
            'track_id' => $request->track_id,
        ]);

        // Retrieve the owner's user_id based on the provided track_id
        $trackOwnerUserId = Track::where('id', $request->track_id)->value('user_id');

        // Save a notification of type 0 (like) for the track owner
        Notification::create([
            'user_id' => $trackOwnerUserId,
            'sender_id' => $request->user_id, // Assuming the user is the sender
            'notification_type' => 0, // Type 0 for like
        ]);

        return response()->json($like, 201);
    }

    public function destroy($userId, $trackId)
    {
        // Find the like
        $like = Like::where('user_id', $userId)->where('track_id', $trackId)->first();

        // If the like exists
        if ($like) {
            // Delete the like
            $like->delete();

            // Find and delete the associated notification (type 0 for like)
            Notification::where('user_id', $userId)
                ->where('sender_id', $trackId) // Assuming the user is the sender of the track
                ->where('notification_type', 0) // Type 0 for like
                ->delete();

            return response()->json(['message' => 'Like deleted successfully']);
        }

        // If the like does not exist
        return response()->json(['message' => 'Like not found'], 404);
    }
}
