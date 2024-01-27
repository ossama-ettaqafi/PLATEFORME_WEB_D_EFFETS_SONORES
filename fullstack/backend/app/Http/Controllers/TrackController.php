<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function index()
    {
        $tracks = Track::all();
        return response()->json($tracks);
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'image_path' => 'nullable|string',
            'duration' => 'required|integer',
            'release_date' => 'required|date',
            'category' => 'required|integer',
            'trackURL' => 'required|string',
        ]);

        $track = Track::create($validatedData);
        return response()->json(['message' => 'Track created successfully', 'track' => $track]);
    }

    public function destroy($id)
    {
        // Find the track by ID
        $track = Track::findOrFail($id);

        // Delete the track
        $track->delete();

        return response()->json(['message' => 'Track deleted successfully']);
    }
}
