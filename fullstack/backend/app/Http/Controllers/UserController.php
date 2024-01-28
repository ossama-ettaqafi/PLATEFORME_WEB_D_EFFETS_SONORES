<?php

// app\Http\Controllers\UserController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function register(Request $request)
    {
        try {
            Log::info('Update User Request Data', ['request_data' => $request->all()]);

            // Validate the request data (you might have additional validation rules)
            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string',
                'bio' => 'string',
                'country' => 'string',
                'city' => 'string',
                'image_file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
                'join_date' => 'date',
            ]);

            // Create a new user with the validated data
            $user = User::create($validatedData);

            // Handle file upload
            if ($request->hasFile('image_file')) {
                $image = $request->file('image_file');

                // Generate a hashed unique name for the image
                $hashedName = $image->hashName();
                $imagePath = 'images/users/';

                // Move the image to the specified directory with the hashed name
                $image->move(public_path($imagePath), $hashedName);

                // Save the image URL in the database
                $user->update(['image_path' => url($imagePath . $hashedName)]);
            } else {
                // Set default image path when no image is uploaded
                $user->update(['image_path' => url('assets/images/def/user-image.png')]);
            }

            // You may want to return a response or redirect as needed
            return response()->json(['user' => $user], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors, check if the email already exists
            if ($e->errors()['email'][0] == 'The email has already been taken.') {
                return response()->json(['error' => 'Email already exists'], 422);
            }

            // Log other validation errors or return a specific error response
            return response()->json(['error' => 'Validation error: ' . $e->getMessage()], 422);
        } catch (\Exception $e) {
            // Log the error or return a specific error response
            return response()->json(['error' => 'Error creating user: ' . $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id)
    {
        try {
        // Log the request data
        Log::info('Update User Request Data', ['request_data' => $request->all()]);

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id, // Ignore the email of the current user
            'password' => 'required|string',
            'bio' => 'string',
            'country' => 'string',
            'city' => 'string',
            'image_file' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Find the user by ID
        $user = User::find($id);

        // Check if the user exists
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Handle file upload if image is provided
        if ($request->hasFile('image_file')) {
            $image = $request->file('image_file');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = 'images/users/';
            $image->move(public_path($imagePath), $imageName);

            // Save the image path in the database
            $user->update(['image_path' => url($imagePath . $imageName)]);
        }

        // Update user data
        $user->update($validatedData);

        // Return a response with the updated user information
        return response()->json(['user' => $user], 200);

    } catch (\Exception $e) {
            // Log the error
            Log::error('Error updating user: ' . $e->getMessage());

            // Return an error response
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
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
}
