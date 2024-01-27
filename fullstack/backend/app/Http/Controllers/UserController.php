<?php

// app\Http\Controllers\UserController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'image_path' => 'nullable|string',
            'bio' => 'nullable|string',
            'join_date' => 'required|date',
            'country' => 'nullable|string',
            'city' => 'nullable|string',
        ]);

        // Create a new user with the validated data
        $user = User::create($validatedData);

        // You can customize the response as needed
        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    public function destroy($id)
    {
        // Find the user by ID
        $user = User::find($id);

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        // You can customize the response as needed
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id, // Ensure email is unique, excluding the current user
            'password' => 'nullable|string|min:8', // You might want to handle password updates differently
            'image_path' => 'nullable|string',
            'bio' => 'nullable|string',
            'join_date' => 'required|date',
            'country' => 'nullable|string',
            'city' => 'nullable|string',
        ]);

        // Find the user by ID
        $user = User::find($id);

        // Check if the user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user with the validated data
        $user->update($validatedData);

        // You can customize the response as needed
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }
}
