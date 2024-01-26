<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    public function index()
    {
        // Fetch all tracks from the database
        $tracks = Track::all();

        // You can return the tracks to a view or as a JSON response, depending on your application's needs
        // return view('tracks.index', ['tracks' => $tracks]);
        // or
        return response()->json($tracks);
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id', // Ensure the user_id exists in the users table
            'image_path' => 'nullable|string',
            'duration' => 'required|integer',
            'release_date' => 'required|date',
            'category' => 'required|integer',
            'trackURL' => 'required|string',
        ]);

        // Create a new track with the validated data
        $track = Track::create($validatedData);

        // You can return a response indicating success or redirect the user to another page
        return response()->json(['message' => 'Track created successfully', 'track' => $track]);
        // or
        // return redirect()->route('tracks.index')->with('success', 'Track created successfully');
    }

    public function destroy($id)
    {
        // Find the track by ID
        $track = Track::findOrFail($id);

        // Delete the track
        $track->delete();

        // You can return a response indicating success or redirect the user to another page
        return response()->json(['message' => 'Track deleted successfully']);
        // or
        // return redirect()->route('tracks.index')->with('success', 'Track deleted successfully');
    }
}
