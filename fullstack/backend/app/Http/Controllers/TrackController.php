<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TrackController extends Controller
{
    public function index()
    {
        $tracks = Track::all();
        return response()->json($tracks, 200);
    }

    public function store(Request $request)
    {
        try {
            // Validate incoming request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'user_id' => 'required|exists:users,id',
                'image_file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust allowed image formats and size
                'audio_file' => 'required|mimes:mp3,wav,ogg|max:20480', // Adjust allowed audio formats and size
                'duration' => 'required|integer',
                'release_date' => 'required|date',
                'category' => 'required|integer',
            ]);

            // Process and store the image with a unique hashed name
            if ($request->hasFile('image_file')) {
                $image = $request->file('image_file');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $imagePath = 'images/covers/' . $validatedData['user_id'] . '/';
                $image->move(public_path($imagePath), $imageName);
                $imagePath = url($imagePath . $imageName);
            }

            // Process and store the audio with a unique hashed name
            if ($request->hasFile('audio_file')) {
                $audio = $request->file('audio_file');
                $audioName = time() . '_' . $audio->getClientOriginalName();
                $audioPath = 'audios/';
                $audio->move(public_path($audioPath), $audioName);
                $audioPath = url($audioPath . $audioName);
            }

            // Now you can use $imagePath and $audioPath in your database or elsewhere

            // Create a new track
            $track = Track::create([
                'title' => $validatedData['title'],
                'user_id' => $validatedData['user_id'],
                'image_path' => $imagePath ?? null, // Use null if no image is uploaded
                'duration' => $validatedData['duration'],
                'release_date' => $validatedData['release_date'],
                'category' => $validatedData['category'],
                'trackURL' => $audioPath ?? null, // Use null if no audio is uploaded
            ]);

            // Log successful track creation
            \Log::info('Track created successfully:', ['track' => $track]);

            return response()->json(['data' => ['message' => 'Track created successfully', 'track' => $track]], 201);
        } catch (\Exception $e) {
            // Log error
            \Log::error('Failed to create track:', ['error' => $e->getMessage()]);

            return response()->json(['error' => 'Failed to create track', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            // Find the track by ID
            $track = Track::findOrFail($id);

            // Delete the track
            $track->delete();

            return response()->json(['message' => 'Track deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete track', 'message' => $e->getMessage()], 500);
        }
    }
}
